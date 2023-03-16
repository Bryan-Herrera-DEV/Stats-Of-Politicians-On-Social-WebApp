import os
import requests

from slack_sdk.webhook import WebhookClient

class Sender:

    def __init__(self):
        self.__token = os.environ["TELEGRAM_TOKEN"]

    def __send_slack(self, token, message):
        url = f'https://hooks.slack.com/services/{token}'
        return (WebhookClient(url).send(text=message).status_code == 200)
    
    def __send_telegram(self, channel, message):
        url_api = f'https://api.telegram.org/bot{self.__token}/sendMessage?chat_id={channel}&text={message}&parse_mode=html'
        return (requests.get(url_api).status_code == 200)
    
    def send(self, type, to, text):
        if type == 'slack':
            return self.__send_slack(to, text)
        if type == 'telegram':
            return self.__send_telegram(to, text)

        raise ValueError('Contact Type not supported.')