import os

from yaml import full_load
from time import sleep

from daemon.checker import Checker


checker = Checker()

while True:
    if int(os.environ["IS_RELEASE"]) == 1:
        with open(os.environ["SERVERLIST_PATH"]) as dump:
            for server in full_load(dump)['servers']:
                checker.scan_server(
                    server['server']['address'],
                    server['server']['contact'],
                    server['server']['contact_type']
                )
        
    sleep(int(os.environ["CHECK_TIME_SECONDS"]))
