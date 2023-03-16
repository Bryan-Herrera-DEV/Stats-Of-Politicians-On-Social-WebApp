from abc import ABC, abstractmethod

class Helper(ABC):

    def _normalize_text(self, text):
        return text.replace("'", "’")

    @abstractmethod
    def insert_accounts(self, accounts, date):
        raise NotImplementedError("Method must be implemented.")

    @abstractmethod
    def insert_group(self, group, date):
        raise NotImplementedError("Method must be implemented.")
    