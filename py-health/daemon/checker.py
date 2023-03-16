import os

from datetime import datetime

from .alert import AlertMessage

class Checker:

    def __init__(self):
        self.__notified = set()

    def __check_server(self, address):
        res = os.system("ping -c 1 " + address + " > /dev/null")
        return (res == 0)

    def scan_server(self, address, contact, contact_type):
        is_connected = self.__check_server(address)
        observer = (address, contact)
        was_unhealthy = observer in self.__notified

        if (is_connected and was_unhealthy) or (not is_connected and not was_unhealthy):
            new_alert = AlertMessage(is_connected, address, datetime.utcnow().isoformat())
            new_alert.notify(contact, contact_type)
            
        if is_connected == was_unhealthy:
            if is_connected: self.__notified.remove(observer)
            else: self.__notified.add(observer)