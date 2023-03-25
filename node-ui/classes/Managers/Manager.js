const MySql = require('../Database/MySql');

class Manager {

    static _db = new MySql();
    
    async getCountries() {
        return await Manager._db.getRows(
            'SELECT DISTINCT(country) \
            FROM political_groups'
        );
    }

    async getGroups(country, date) {
        return await Manager._db.getRows(
            'SELECT * \
            FROM political_groups \
            WHERE country = ? AND last_update = ?',
            [country, date]
        );
    }

    async getAccounts() {
        throw new Error('Method must be implemented.');
    }
}

module.exports = Manager