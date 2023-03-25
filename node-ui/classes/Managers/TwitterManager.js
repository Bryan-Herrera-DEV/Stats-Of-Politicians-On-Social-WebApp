const Manager = require('./Manager');

class TwitterManager extends Manager {

    async getAccounts(country, date) {
        return await TwitterManager._db.getRows(
            'SELECT ta.handle, ta.profile_image_url, pg.name \
            FROM twitter_accounts ta JOIN political_groups pg ON ta.political_group = pg.name \
            WHERE ta.last_update = ? AND pg.country = ?',
            [date, country]
        );
    }

    async getAccountsByGroup(name, date) {
        return await TwitterManager._db.getRows(
            'SELECT handle \
            FROM twitter_accounts \
            WHERE last_update = ? AND political_group = ?',
            [date, name]
        );
    }

    async getAccountInfo(username, date) {
        return await TwitterManager._db.getRows(
            'SELECT * FROM twitter_accounts WHERE handle = ? AND last_update = ?',
            [username, date]
        );
    }

    async getAccountInsights(username, date) {
        return await TwitterManager._db.getRows(
            'SELECT * FROM twitter_dailystats_accounts WHERE handle = ? AND date = ?',
            [username, date]
        );
    }

    async getAccountHashtags(username, date, limit) {
        return await TwitterManager._db.getRows(
            `SELECT hashtag, COUNT(*) AS occurrences \
            FROM twitter_hashtags_account \
            WHERE handle = ? AND date >= ? \
            GROUP BY handle, hashtag \
            ORDER BY occurrences DESC \
            LIMIT ${limit}`,
            [username, date]
        );
    }

    async getGroupInfo(name, date) {
        return await TwitterManager._db.getRows(
            'SELECT * FROM political_groups WHERE name = ? AND last_update = ?',
            [name, date]
        );
    }

    async getGroupInsights(name, date) {
        return await TwitterManager._db.getRows(
            'SELECT * FROM twitter_dailystats_group WHERE name = ? AND date = ?',
            [name, date]
        );
    }
}

module.exports = TwitterManager