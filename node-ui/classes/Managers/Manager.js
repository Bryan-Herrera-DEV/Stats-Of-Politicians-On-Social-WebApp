const MySql = require('../Database/MySql');

class Manager {

    static _db = new MySql();
    
    static async getCountries() {
        return await Manager._db.getRows(
            'SELECT DISTINCT(country) \
            FROM political_groups'
        );
    }

    static async getGroups(country, date) {
        return await Manager._db.getRows(
            'SELECT * \
            FROM political_groups \
            WHERE country = ? AND last_update = ?',
            [country, date]
        );
    }
}

module.exports = Manager