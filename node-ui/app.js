const express = require('express');
const body_parser = require('body-parser');
const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static('assets'));

app.listen(8080, '0.0.0.0');


const DateOperations = require('./classes/DateOperations');
const TwitterManager = require('./classes/Managers/TwitterManager');


const exceptionMessage = (url, msg) => console.error(`Exception @ ${url} : ${msg}`);

const since_mapper = {
    'w': DateOperations.goDaysBackFromNow(7),
    'm': DateOperations.goMonthsBackFromNow(1),
    'y': DateOperations.goYearsBackFromNow(1)
};



app.get('/api/countries', async (req, res) => {
    res.json(await TwitterManager.getCountries());
});

app.get('/api/:country/groups', async (req, res) => {
    const { country } = req.params;
    res.json(await TwitterManager.getGroups(country, DateOperations.getYesterday()));
});



app.get('/api/:country/:social/accounts', async (req, res) => {
    const { country, social } = req.params;
    
    try {
        res.json(await TwitterManager.getAccounts(country, DateOperations.getYesterday()));
    }
    catch(err) {
        exceptionMessage(`/api/${country}/${social}/accounts`, err.message);
        res.status(404).send({ message: 'Check your request parameters.' });
    }
});

app.get('/api/:social/accounts/:group/all', async (req, res) => {
    const { social, group } = req.params;

    try {
        res.json(await TwitterManager.getAccountsByGroup(group, DateOperations.getYesterday()));
    }
    catch(err) {
        exceptionMessage(`/api/${social}/accounts/${group}/all`, err.message);
        res.status(404).send({ message: 'Check your request parameters.' });
    }
});



app.get('/api/:social/accounts/:handle/info', async (req, res) => {
    const { social, handle } = req.params;

    try {
        res.json(await TwitterManager.getAccountInfo(handle, DateOperations.getYesterday()));
    }
    catch(err) {
        exceptionMessage(`/api/${social}/accounts/${handle}/info`, err.message);
        res.status(404).send({ message: 'Check your request parameters.' });
    }
});

app.get('/api/:social/accounts/:handle/insights', async (req, res) => {
    const { social, handle } = req.params;

    try {
        res.json(await TwitterManager.getAccountInsights(handle, DateOperations.getYesterday()));
    }
    catch(err) {
        exceptionMessage(`/api/${social}/accounts/${handle}/insights`, err.message);
        res.status(404).send({ message: 'Check your request parameters.' });
    }
});

app.get('/api/:social/accounts/:handle/hashtags/:since/:limit', async (req, res) => {
    const { social, handle, since, limit } = req.params;

    try {
        res.json(await TwitterManager.getAccountHashtags(handle, since_mapper[since], limit));
    }
    catch(err) {
        exceptionMessage(`/api/${social}/accounts/${handle}/hashtags/${since}/${limit}`, err.message);
        res.status(404).send({ message: 'Check your request parameters.' });
    }
});

app.get('/api/:social/accounts/:handle/history/:operation/:since', async (req, res) => {
    const { social, handle, operation, since } = req.params;

    try {
        if (operation == 'followers') res.json(await TwitterManager.getAccountFollowers(handle, since_mapper[since]));
        else if (operation == 'likes') res.json(await TwitterManager.getAccountLikes(handle, since_mapper[since]));
        else if (operation == 'retweets') res.json(await TwitterManager.getAccountRetweets(handle, since_mapper[since]));
        else if (operation == 'replies') res.json(await TwitterManager.getAccountReplies(handle, since_mapper[since]));
        else if (operation == 'lens') res.json(await TwitterManager.getAccountLengths(handle, since_mapper[since]));
        else if (operation == 'fetched') res.json(await TwitterManager.getAccountFetchedTweets(handle, since_mapper[since]));
        else res.json([]);
    }
    catch(err) {
        exceptionMessage(`/api/${social}/accounts/${handle}/history/${operation}/${since}`, err.message);
        res.status(404).send({ message: 'Check your request parameters.' });
    }
});



app.get('/api/:social/groups/:group/info', async (req, res) => {
    const { social, group } = req.params;

    try {
        res.json(await TwitterManager.getGroupInfo(group, DateOperations.getYesterday()));
    }
    catch(err) {
        exceptionMessage(`/api/${social}/groups/${group}/info`, err.message);
        res.status(404).send({ message: 'Check your request parameters.' });
    }
});

app.get('/api/:social/groups/:group/insights', async (req, res) => {
    const { social, group } = req.params;

    try {
        res.json(await TwitterManager.getGroupInsights(group, DateOperations.getYesterday()));
    }
    catch(err) {
        exceptionMessage(`/api/${social}/groups/${group}/insights`, err.message);
        res.status(404).send({ message: 'Check your request parameters.' });
    }
});

app.get('/api/:social/groups/:group/history/:operation/:since', async (req, res) => {
    const { social, group, operation, since } = req.params;

    try {
        if (operation == 'followers') res.json(await TwitterManager.getGroupFollowers(group, since_mapper[since]));
        else if (operation == 'likes') res.json(await TwitterManager.getGroupLikes(group, since_mapper[since]));
        else if (operation == 'retweets') res.json(await TwitterManager.getGroupRetweets(group, since_mapper[since]));
        else if (operation == 'replies') res.json(await TwitterManager.getGroupReplies(group, since_mapper[since]));
        else if (operation == 'lens') res.json(await TwitterManager.getGroupLengths(group, since_mapper[since]));
        else if (operation == 'fetched') res.json(await TwitterManager.getGroupFetchedTweets(group, since_mapper[since]));
        else res.json([]);
    }
    catch(err) {
        exceptionMessage(`/api/${social}/groups/${group}/history/${operation}/${since}`, err.message);
        res.status(404).send({ message: 'Check your request parameters.' });
    }
});