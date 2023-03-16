class RelationalDatabase {
    _host;
    _port;
    _user;
    _password;
    _db;

    _connection;
    _isConnected;

    constructor() {
        if (this.constructor === RelationalDatabase)
            throw new TypeError('Cannot construct an abstract instance directly.');
    }

    _connect() {
        throw new Error('Method must be implemented.');
    }

    _disconnect() {
        throw new Error('Method must be implemented.');
    }

    getRows() {
        throw new Error('Method must be implemented.');
    }
}

module.exports = RelationalDatabase