import mysql.connector
import os

from .rdb import RelationalDatabase

class MySql(RelationalDatabase):

    def __init__(self):
        pass
    
    def _connect(self):
        self._conn = mysql.connector.connect(
            host=os.environ["MYSQL_HOST"],
            port=os.environ["MYSQL_PORT"],
            user=os.environ["MYSQL_USER"],
            password=os.environ["MYSQL_PSW"],
            database=os.environ["MYSQL_DB"]
        )
    
    def _disconnect(self):
        return self._conn.close()

    def __execute(self, sql, data = [], is_select=False):
        self._connect()
        curs = self._conn.cursor(buffered=True)
        curs.execute(MySQLdb.escape_string(sql), data)

        self._conn.commit()
        result = curs.fetchall() if is_select else curs.rowcount
        
        self._disconnect()
        return result
    
    def select_all(self, table):
        sql = 'SELECT * FROM %s' % table
        return self.__execute(sql, [], True)

    def delete(self, table, query):
        sql = 'DELETE FROM %s WHERE %s' % (table, self._get_conditions(query))
        return self.__execute(sql, self._get_data(query))

    def insert(self, table, query):
        sql = 'INSERT IGNORE INTO %s (%s) VALUES (%s)' % (table, self._get_columns(query), self._get_values(query))
        return self.__execute(sql, self._get_data(query))

    def update(self, table, query, condition):
        sql = 'UPDATE %s SET %s WHERE %s' % (table, self._get_setter(query), self._get_conditions(condition))
        return self.__execute(sql, self._get_data(query) + self._get_data(condition))

    def upsert(self, table, insert, update):
        sql = 'INSERT INTO %s (%s) VALUES (%s) ' % (table, self._get_columns(insert), self._get_values(insert))
        sql += 'ON DUPLICATE KEY UPDATE %s' % self._get_setter(update)
        return self.__execute(sql, self._get_data(insert) + self._get_data(update))
