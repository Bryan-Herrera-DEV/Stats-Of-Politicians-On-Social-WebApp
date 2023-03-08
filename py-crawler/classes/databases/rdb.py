from abc import ABC, abstractmethod

class RelationalDatabase(ABC):

    def _get_data(self, req):
        return [value for value in req.values()]

    def _get_conditions(self, req):
        return ' AND '.join([key + '=%s' for key in req.keys()])

    def _get_columns(self, req):
        return ', '.join([key for key in req.keys()])
    
    def _get_setter(self, req):
        return ', '.join([key + '=%s' for key in req.keys()])
    
    def _get_values(self, req):
        return ', '.join(['%s'] * len(req))

    @abstractmethod
    def _connect(self):
        raise NotImplementedError("Method must be implemented.")
    
    @abstractmethod
    def _disconnect(self):
        raise NotImplementedError("Method must be implemented.")

    @abstractmethod
    def select_all(self):
        raise NotImplementedError("Method must be implemented.")

    @abstractmethod
    def delete(self):
        raise NotImplementedError("Method must be implemented.")

    @abstractmethod
    def insert(self):
        raise NotImplementedError("Method must be implemented.")

    @abstractmethod
    def update(self):
        raise NotImplementedError("Method must be implemented.")
    
    @abstractmethod
    def upsert(self):
        raise NotImplementedError("Method must be implemented.")