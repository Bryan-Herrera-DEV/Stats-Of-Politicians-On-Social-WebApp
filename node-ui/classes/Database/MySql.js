const mysql = require('mysql');
const RelationalDatabase = require('./RelationalDatabase');

class MySql extends RelationalDatabase {

    constructor() {
        super();

        this._host = process.env.MYSQL_HOST;
        this._port = process.env.MYSQL_PORT;
        this._user = process.env.MYSQL_USER;
        this._password = process.env.MYSQL_PSW;
        this._db = process.env.MYSQL_DB;

        this._connection = null;
        this._isConnected = false;
    }

    async _connect() {
        if (this._isConnected)
            return;

        this._connection = mysql.createConnection({
            host: this._host,
            port: this._port,
            user: this._user,
            password: this._password,
            database: this._db,
            charset : 'utf8mb4'
        });

        await new Promise((resolve, reject) => {
            this._connection.connect((error) => {
                if (!error) resolve(true);
                else reject(error.message);
            });
        })
        .then(res => this._isConnected = res)
        .catch(err => {
            console.log('Error in MySql class @ _connect() ' + err);
            this._isConnected = false
        });
    }

    async _disconnect() {
        if (!this._isConnected)
            return;

        await this._connection.end();
        this._isConnected = false;
    }

    async getRows(sqlQuery, data=[]) {
        await this._connect();

        if (this._isConnected !== true) {
            console.log('MySql class @ getRows() : you are not connected');
            return null;
        }

        try {
            return await new Promise((resolve, reject) => {
                this._connection.query(sqlQuery, data, (error, res) => {
                    if (error) reject(error.message);
                    else resolve(JSON.stringify(res));
                });
            })
            .then(async res => {
                await this._disconnect();
                return JSON.parse(res);
            })
            .catch(async err => {
                console.log('Error in MySql class @ getRows() ' + err);
                await this._disconnect();
                return null;
            });
        }
        catch (err) {
            console.error('MySql class @ getRows() : ', err.message);
            console.error(sqlQuery);
            console.error(data);
            return null;
        }
    }
}

module.exports = MySql
