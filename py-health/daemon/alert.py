from .sender import Sender

class AlertMessage:

    def __init__(self, outcome, server, timestamp):
        self.__outcome = outcome
        self.__server_address = server
        self.__timestamp = timestamp

    def __generate_text(self):
        msg = f'Hi there 👋🏻, it seems that your server - {self.__server_address.upper()} - '
        msg += f'returned online ' if self.__outcome else f'went offline '
        msg += f'on {self.__timestamp} '
        return msg + '✅' if self.__outcome else msg + '⚠️'
    
    def notify(self, contact, contact_type):
        return Sender().send(
            contact_type,
            contact,
            self.__generate_text()
        )