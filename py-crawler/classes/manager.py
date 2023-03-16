import yaml
import os

from collections import defaultdict

from classes.political_accounts.creator import AccountCreator
from classes.political_groups.creator import GroupCreator
from classes.political_helpers.creator import HelperCreator

class Manager:
    config_file_path = os.environ['DUMP_PATH']

    @staticmethod
    def __create_group(accounts, country, name, social):
        logo_color = Manager.__get_groups(country)[name]
        return GroupCreator.get_group(accounts, logo_color, country, name, social)

    @staticmethod
    def __get_config():
        with open(Manager.config_file_path) as dump:
            return yaml.full_load(dump)

    @staticmethod
    def __get_accounts(country, social):
        accs = Manager.__get_config()[country + '_' + social + '_accounts']
        return {acc['account']['handle']: acc['account']['group'] for acc in accs}

    @staticmethod
    def __get_groups(country):
        groups = Manager.__get_config()[country + '_groups']
        return {gr['group']['name']: gr['group']['logo_color'] for gr in groups}

    @staticmethod
    def __save_all(accounts, group, social, date):
        helper = HelperCreator.get_helper(social)
        helper.insert_group(group, date)
        helper.insert_accounts(accounts, date)

    @staticmethod
    def get_countries():
        return Manager.__get_config()['countries']

    @staticmethod
    def get_socials():
        return Manager.__get_config()['socials']

    @staticmethod
    def fetch_and_save(country, social, yesterday, today):
        accs_info = Manager.__get_accounts(country, social)
        accounts = defaultdict(list)

        for handle, group in accs_info.items():
            account = AccountCreator.get_account(group, handle, social)
            account.fetch_data(yesterday, today)
            accounts[group].append(account)

        for name, accs in accounts.items():
            group = Manager.__create_group(accs, country, name, social)
            Manager.__save_all(accs, group, social, yesterday)