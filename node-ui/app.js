const express = require('express');
const body_parser = require('body-parser');
const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static('assets'));

app.listen(8080, '0.0.0.0');


const DateOperations = require('./classes/DateOperations');
const Manager = require('./classes/Managers/Manager');
const TwitterManager = require('./classes/Managers/TwitterManager');

const since_mapper = {
    'w': DateOperations.goDaysBackFromNow(7),
    'm': DateOperations.goMonthsBackFromNow(1),
    'y': DateOperations.goYearsBackFromNow(1)
};



app.get('/api/countries', async (req, res) => {
    res.json(await Manager.getCountries());
});

app.get('/api/:country/groups', async (req, res) => {
    const { country } = req.params;
    res.json(await Manager.getGroups(country, DateOperations.getYesterday()));
});



app.get('/api/:country/twitter/accounts', async (req, res) => {
    const { country } = req.params;

    accounts = await TwitterManager.getAccounts(country, DateOperations.getYesterday());
    
    if (accounts == null)
        return res.status(404).send({ message: 'Check your request parameters.' });

    res.json(accounts);
});

app.get('/api/twitter/accounts/:group/all', async (req, res) => {
    const { group } = req.params;

    accounts = await TwitterManager.getAccountsByGroup(group, DateOperations.getYesterday());
    
    if (accounts == null)
        return res.status(404).send({ message: 'Check your request parameters.' });

    res.json(accounts);
});

app.get('/api/twitter/accounts/:handle/info', async (req, res) => {
    const { handle } = req.params;

    info = await TwitterManager.getAccountInfo(handle, DateOperations.getYesterday());
    
    if (info == null)
        return res.status(404).send({ message: 'Check your request parameters.' });

    res.json(info);
});

app.get('/api/twitter/accounts/:handle/insights', async (req, res) => {
    const { handle } = req.params;

    insights = await TwitterManager.getAccountInsights(handle, DateOperations.getYesterday());
    
    if (insights == null)
        return res.status(404).send({ message: 'Check your request parameters.' });

    res.json(insights);
});

app.get('/api/twitter/accounts/:handle/hashtags/:since/:limit', async (req, res) => {
    const { handle, since, limit } = req.params;

    hashtags = await TwitterManager.getAccountHashtags(handle, since_mapper[since], limit);
    
    if (hashtags == null)
        return res.status(404).send({ message: 'Check your request parameters.' });

    res.json(hashtags);
});

app.get('/api/twitter/accounts/:handle/history/:operation/:since', async (req, res) => {
    const { handle, operation, since } = req.params;

    if (operation == 'followers') history = await TwitterManager.getAccountFollowers(handle, since_mapper[since]);
    else if (operation == 'likes') history = await TwitterManager.getAccountLikes(handle, since_mapper[since]);
    else if (operation == 'retweets') history = await TwitterManager.getAccountRetweets(handle, since_mapper[since]);
    else if (operation == 'replies') history = await TwitterManager.getAccountReplies(handle, since_mapper[since]);
    else if (operation == 'lens') history = await TwitterManager.getAccountLengths(handle, since_mapper[since]);
    else if (operation == 'fetched') history = await TwitterManager.getAccountFetchedTweets(handle, since_mapper[since]);
    else history = null;

    if (history == null)
        return res.status(404).send({ message: 'Check your request parameters.' });

    res.json(history);
});



app.get('/api/twitter/groups/:group/info', async (req, res) => {
    const { group } = req.params;

    info = await TwitterManager.getGroupInfo(group, DateOperations.getYesterday());
    
    if (info == null)
        return res.status(404).send({ message: 'Check your request parameters.' });

    res.json(info);
});

app.get('/api/twitter/groups/:group/insights', async (req, res) => {
    const { group } = req.params;

    insights = await TwitterManager.getGroupInsights(group, DateOperations.getYesterday());
    
    if (insights == null)
        return res.status(404).send({ message: 'Check your request parameters.' });

    res.json(insights);
});

app.get('/api/twitter/groups/:group/history/:operation/:since', async (req, res) => {
    const { group, operation, since } = req.params;

    if (operation == 'followers') history = await TwitterManager.getGroupFollowers(group, since_mapper[since]);
    else if (operation == 'likes') history = await TwitterManager.getGroupLikes(group, since_mapper[since]);
    else if (operation == 'retweets') history = await TwitterManager.getGroupRetweets(group, since_mapper[since]);
    else if (operation == 'replies') history = await TwitterManager.getGroupReplies(group, since_mapper[since]);
    else if (operation == 'lens') history = await TwitterManager.getGroupLengths(group, since_mapper[since]);
    else if (operation == 'fetched') history = await TwitterManager.getGroupFetchedTweets(group, since_mapper[since]);
    else history = null;

    if (history == null)
        return res.status(404).send({ message: 'Check your request parameters.' });

    res.json(history);
});