# Stats-Of-Politicians-On-Social-WebApp

_Personal Project for Politicians Analysis._ <br/>
_The idea comes from a university project for the Social Media Management course._

[![CodeFactor](https://www.codefactor.io/repository/github/antonioscardace/stats-of-politicians-on-social-webapp/badge/main)](https://www.codefactor.io/repository/github/antonioscardace/system-stats-by-keylogger/overview/main)

The project aims to make stats about Politicians' use of Social Media.<br/>
It analyses, for each social media, politicians of any country belonging to any political group.

## Structure

The structure of the project is designed below.<br/>
All the components have been created on **Docker**.

<img src="/docs/imgs/template.png" width="650px"/>

### Crawler (Python + YAML)

Every day, at **00:00 AM UTC**, it starts a job with three main phases managed by ```Manager```.

- **Reading**: it reads from the **YAML config file** all the info necessary to make stats. Precisely, it contains socials, countries and their respective political groups and accounts we want to analyse. I have decided to use a YAML file rather than a relational DB because it is easier to update and store.
- **Fetching & Processing**: for each social and country, it retrieves data for each account for the last 24hrs and puts them into an Account object (one for each account). Once constructed a list of accounts' objects, it instantiates a Group object. These objects make all the stats required for the last 24hrs.
- **Saving**: once made all accounts and political groups' objects associated with a given country on a given social, the data are saved through a ```Helper``` into a database.

Below is illustrated a simplified UML of the crawler. <br/>
It has to be noted that ```Account```, ```Group```, and ```Helper``` use a **Factory Method Design Pattern**. 

<img src="/docs/uml/crawler.svg" height="500px"/>

### Database (MySQL)

MySQL, a relational DBMS, is the DBMS I have chosen to store all the data. It is easy and fast.<br/>
The Logical Schema can be found in ```/docs/imgs/db.png```.<br/>
Let's see a light version of the E-R schema:

<img src="/docs/uml/db.svg" width="650px"/>

### UI (Node.js, HTML, CSS, JS)

UI has been implemented using **HTML**, **CSS**, **Bootstrap**, and **JS (with JQuery)**. <br/>
On request, via REST APIs using **AJAX**, the **Node.js** back-end connects to the MySQL database and returns in **JSON** format to the front-end what it has asked for (or an error code ``404``).

Let's see the available APIs at this moment:

``/api/countries``: gets all countries analysed yesterday.<br/>
``/api/:country/groups``: gets all _:country_'s political groups analysed yesterday.<br/>
``/api/:country/:social/accounts``: gets all _:country_'s accounts analysed yesterday.<br/><br/>
``/api/:social/groups/:group/info``: gets yesterday info about _:group_.<br/>
``/api/:social/groups/:group/insights``: gets yesterday insights about _:group_.<br/><br/>
``/api/:social/accounts/:group/all``: gets all accounts of _:group_ analysed yesterday.<br/>
``/api/:social/accounts/:handle/info``: gets yesterday info about _:handle_.<br/>
``/api/:social/accounts/:handle/insights``: gets yesterday insights about _:handle_.<br/>
``/api/:social/accounts/:handle/hashtags/:since/:limit``: gets top _:limit_ used hashtags by _:handle_ since _:since_.

Below is illustrated the backend UML.<br/>
It has to be noticed that ```Manager``` implement a sort of **Factory Method Design Pattern**. 

<img src="/docs/uml/backend.svg" height="450px"/>

### Charts (Grafana)

The charts have been created and managed using **Grafana**.<br/>
I have generated **HTTPS certifications** to allow a secure connection.<br/>
Furthermore, I have set Grafana to be accessible just by the admin (username and password are required).

In case of an update in **MySQL** settings (environment variables in ``docker-compose.yml``: ``host``, ``port``, ``user``, ``password``, ``database name``), you must update ``/grafana-charts/provisioning/datasources/default.yml`` to import the data source into Grafana.

**Datasource** and **Dashboard** are automatically imported.<br/>
**Dashboard Panels** are embedded in the UI through specific ``<iframe>`` tags.

<img src="/docs/imgs/grafana.png" width="700px"/>

### Containers Health Checker (Python + YML)

I have implemented a basic health checker for all the containers. <br/>
It has been implemented in **Python** and reads IP addresses and contacts from a **YAML Config file**.<br/>
Now, it can send messages to **Telegram** channels and **Slack** channels/contacts.

Let's see how the config file looks like: 

<img src="/docs/imgs/yaml-checker.png"/>

## Provided Statistics

### Twitter

- For Each Account and Political Group:
  - Total Likes (yesterday)
  - Total Retweets (yesterday)
  - Total Replies (yesterday)
  - Average Likes (yesterday)
  - Average Retweets (yesterday)
  - Average Replies (yesterday)
  - Average Length of a Tweet **(in characters)** (yesterday)
  - Average Sentiment Analysis **(Positive, Negative, Neutral, Null)** (yesterday) <br/><br/>
  - Charts of Compare Among All Political Groups (followers, likes, etc.)<br/><br/>
  - Chart with the History of the Number of Analysed Tweets Over Time
  - Chart with the History of Total Followers Over Time
  - Chart with the History of Avg Tweets Length Over Time
  - Chart with the History of Avg Likes Over Time
  - Chart with the History of Avg Retweets Over Time
  - Chart with the History of Avg Replies Over Time
  - Top 5 Most Used Hashtags **(just for accounts)** (last week, last month, last year) 
    
## Light Demo

![Screen 1](/docs/snaps/screen-0.png)
---
![Screen 2](/docs/snaps/screen-1.png)
---
![Screen 3](/docs/snaps/screen-3.png)
---
![Screen 4](/docs/snaps/screen-4.png)
***
![Screen 5](/docs/snaps/screen-5.png)
---
![Screen 6](/docs/snaps/screen-6.png)
---
![Screen 7](/docs/snaps/screen-7.png)
---
![Screen 8](/docs/snaps/screen-8.png)
---
![Screen 9](/docs/snaps/screen-9.png)
***
![Screen 10](/docs/snaps/screen-10.png)
---
![Screen 11](/docs/snaps/screen-11.png)
***
![Screen 12](/docs/snaps/screen-12.png)

## Getting Started

So that the repository is successfully cloned and the project runs smoothly, a few steps need to be followed. <br/>
**N.B.** All used keys, tokens, and passwords are invalid and have to be re-generated.

### Requisites

* A stable internet connection. 
* Use of Linux, MacOS, or Windows WSL.
* Having a Twitter Developer Account with related keys and tokens (for Twitter).
* Having a Telegram Bot (with a related channel) or a Slack WebHook.
* Need to download and install [Docker](https://docs.docker.com/get-docker/) ([Docker Desktop](https://www.docker.com/products/docker-desktop/) is recommended).
* The use of [Visual Studio Code](https://code.visualstudio.com/download) is strongly recommended for modify.

### Installation and Use

```sh
   $ git clone https://github.com/antonioscardace/Stats-Of-Politicians-On-Social-WebApp.git
   $ cd YOUR_PATH/Stats-Of-Politicians-On-Social-WebApp/
   $ bash run.sh
```

### Useful Links

| Container | Link |
| ----- | ---- |
| Node-UI | [http://localhost:8080/](http://localhost:8080/) |
| Grafana-Charts | [https://localhost:3000/](https://localhost:3000/) |

## To Do Improvements

- [ ] Add other countries in addition to Italy.
- [ ] Add other socials (e.g. Instagram).
- [ ] Re-implement front-end using Vue.js or similar frameworks.
- [x] Re-design Node.Js back-end to be hybrid with more socials and countries. Design Patterns...

## License :copyright:

Author: [Antonio Scardace](https://linktr.ee/antonioscardace). <br/>
See ``LICENSE`` for more information.
