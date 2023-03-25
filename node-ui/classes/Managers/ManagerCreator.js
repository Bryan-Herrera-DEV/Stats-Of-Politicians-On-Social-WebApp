const Manager = require('./Manager');
const TwitterManager = require('./TwitterManager');

class ManagerCreator {

    static getManager(social='none') {
        if (social == 'none') return new Manager();
        else if (social == 'twitter') return new TwitterManager();
        return null;
    }
}

module.exports = ManagerCreator