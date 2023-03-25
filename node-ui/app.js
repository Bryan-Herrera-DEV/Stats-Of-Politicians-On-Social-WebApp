const express = require('express');
const body_parser = require('body-parser');
const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static('assets'));

app.listen(8080, '0.0.0.0');


const DateOperations = require('./classes/DateOperations');
const ManagerCreator = require('./classes/Managers/ManagerCreator');



app.get('/api/countries', async (req, res) => {
    const man = ManagerCreator.getManager();
    res.json(await man.getCountries());
});

app.get('/api/:country/groups', async (req, res) => {
    const { country } = req.params;
    const man = ManagerCreator.getManager();
    res.json(await man.getGroups(country, DateOperations.getYesterday()));
});



app.get('/api/:country/:social/accounts', async (req, res) => {
    const { country, social } = req.params;
    const man = ManagerCreator.getManager(social);
    let accounts = await man.getAccounts(country, DateOperations.getYesterday());
    
    if (accounts == null) return res.status(404).send({ message: 'Check your request parameters.' });
    res.json(accounts);
});

app.get('/api/:social/accounts/:group/all', async (req, res) => {
    const { social, group } = req.params;
    const man = ManagerCreator.getManager(social);
    let accounts = await man.getAccountsByGroup(group, DateOperations.getYesterday());
    
    if (accounts == null) return res.status(404).send({ message: 'Check your request parameters.' });
    res.json(accounts);
});

app.get('/api/:social/accounts/:handle/info', async (req, res) => {
    const { social, handle } = req.params;
    const man = ManagerCreator.getManager(social);
    let info = await man.getAccountInfo(handle, DateOperations.getYesterday());
    
    if (info == null) return res.status(404).send({ message: 'Check your request parameters.' });
    res.json(info);
});

app.get('/api/:social/accounts/:handle/insights', async (req, res) => {
    const { social, handle } = req.params;
    const man = ManagerCreator.getManager(social);
    let insights = await man.getAccountInsights(handle, DateOperations.getYesterday());
    
    if (insights == null) return res.status(404).send({ message: 'Check your request parameters.' });
    res.json(insights);
});

app.get('/api/:social/groups/:group/info', async (req, res) => {
    const { social, group } = req.params;
    const man = ManagerCreator.getManager(social);
    let info = await man.getGroupInfo(group, DateOperations.getYesterday());
    
    if (info == null) return res.status(404).send({ message: 'Check your request parameters.' });
    res.json(info);
});

app.get('/api/:social/groups/:group/insights', async (req, res) => {
    const { social, group } = req.params;
    const man = ManagerCreator.getManager(social);
    let insights = await man.getGroupInsights(group, DateOperations.getYesterday());
    
    if (insights == null) return res.status(404).send({ message: 'Check your request parameters.' });
    res.json(insights);
});



app.get('/api/:social/accounts/:handle/hashtags/:since/:limit', async (req, res) => {
    const { social, handle, since, limit } = req.params;

    const since_mapper = {
        'w': DateOperations.goDaysBackFromNow(7),
        'm': DateOperations.goMonthsBackFromNow(1),
        'y': DateOperations.goYearsBackFromNow(1)
    };

    const man = ManagerCreator.getManager(social);
    let hashtags = await man.getAccountHashtags(handle, since_mapper[since], limit);
    
    if (hashtags == null) return res.status(404).send({ message: 'Check your request parameters.' });
    res.json(hashtags);
});