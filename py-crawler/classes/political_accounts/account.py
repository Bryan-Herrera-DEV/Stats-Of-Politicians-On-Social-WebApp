from abc import ABC, abstractmethod

class Account(ABC):

    @abstractmethod
    def __init__(self, handle, group):
        raise NotImplementedError("Method must be implemented.")

    @abstractmethod
    def fetch_data(self, start_time, end_time):
        raise NotImplementedError("Method must be implemented.")