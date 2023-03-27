# Stats-Of-Politicians-On-Social-WebApp

_Personal Project for Politicians Analysis._ <br/>
_The idea comes from a university project for the Social Media Management course._

## Introduction

The project aims to make stats about Politicians' use of Social Media.<br/>
It analyses, for each social media, politicians of any country, belonging to any political group.

## Structure

The structure of the project is designed below.
All the components have been created on Docker.

- **Health Checker | Python & YAML**: it checks every second the health of all Docker containers. On error (and online return) it sends notifications on Telegram and-or Slack.
- **Crawler | Python & YAML**: once a day it reads the YML file (countries, socials, and accounts we have to analyze), fetches all the data, and saves them into the database.
- **Database | MySQL**: stores all the data sent by the Crawler updated day-by-day.
- **Charts | Grafana**: it makes and provides a lot of charts with data fetched from the database.
- **UI | Node.Js, HTML, CSS, JS**: fetches and visualizes (even using Grafana) all the data from the database.

<img src="/docs/imgs/schema.png" width="725px"/>

### Config File (YML)

It is useful to store socials, countries, accounts, and political groups to analyze. <br/>
I use a YML file rather than a relational DB because it is easier to update and store.

Here is an example of what it contains:

<img src="/docs/imgs/yaml.png" height="380px"/>

### Crawler (Python)

Every day, at **00:00 AM UTC**, it starts a job with three main phases managed by ```Manager```.

- **Reading**: it reads from the YML config file all the info necessary to make stats. Precisely, it contains socials, countries and their respective political groups and accounts we want to analyze. 
- **Fetching & Processing**: for each social and country, it retrieves data for each account for the day that just passed, and it puts them into an ```Account``` object (one for each account). Once made a list of accounts' objects, it instantiates a ```Group``` object. These objects make all the stats required for the last 24hrs.
- **Saving**: once made all accounts and politics groups' objects associated with a given country on a given social, the data are saved through a ```Helper``` into a database.

Below is illustrated a simplified UML of the crawler. <br/>
It has to be noticed that ```Account```, ```Group```, and ```Helper``` use a **Factory Method Design Pattern**. 

<img src="/docs/uml/crawler.svg" height="600px"/>

### Database (MySQL)

The DBMS I have chosen to store all the data is in MySQL, a relational DBMS.<br/>
The Logical Schema can be found in ```/docs/imgs/db.png```.

In case of an update in MySQL settings (environments variables in ``docker-compose.yml``: ``host``, ``port``, ``database name``, ``user``, ``password``), don't forget to update ``/grafana-charts/provisioning/datasources/default.yml``, which is useful to import the data source into Grafana.

Let's see a light version of the E-R schema.

<img src="/docs/uml/db.svg" width="750px"/>

### UI (Node.js, HTML, CSS, JS)

UI has been implemented using HTML, CSS (Bootstrap), and JS (JQuery). <br/>
On request, via REST APIs using AJAX, the Node.js back-end connects to the MySQL database and returns in JSON format to the front-end what it has asked for (or an error code).

Below is illustrated the backend UML.<br/>
It has to be noticed that ```Manager``` uses a **Factory Method Design Pattern**. 

<img src="/docs/uml/backend.svg" height="570px"/>

Let's see the available APIs at this moment:

``/api/countries``: gets all countries analysed yesterday.<br/>
``/api/:country/groups``: gets all _:country_'s political groups analysed yesterday.<br/>
``/api/:country/:social/accounts``: gets all _:country_'s accounts analysed yesterday.<br/><br/>
``/api/:social/groups/:group/info``: gets yesterday info about _:group_.<br/>
``/api/:social/groups/:group/insights``: gets yesterday insights about _:group_.<br/><br/>
``/api/:social/accounts/:group/all``: gets all accounts of _:group_ analysed yesterday.<br/>
``/api/:social/accounts/:handle/info``: gets yesterday info about _:handle_.<br/>
``/api/:social/accounts/:handle/insights``: gets yesterday insights about _:handle_.<br/>
``/api/:social/accounts/:handle/hashtags/:since/:limit``: gets top _:limit_ used hashtags by _:handle_ since _:since_.<br/>

## Provided Statistics

### Twitter

- For Each Account and Political Group:
  - Total Likes (yesterday)
  - Total Retweets (yesterday)
  - Total Replies (yesterday)
  - Average Likes (yesterday)
  - Average Retweets (yesterday)
  - Average Replies (yesterday)
  - Average Length of a Tweet (in characters)
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
***
![Screen 9](/docs/snaps/screen-10.png)
---
![Screen 10](/docs/snaps/screen-11.png)

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
   $ git clone https://github.com/antonioscardace/Stats-Of-Politicians-On-Socials-WebApp.git
   $ cd YOUR_PATH/Stats-Of-Politicians-On-Socials-WebApp/
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
- [x] Take a look at HTTPS, Domain, Load Balancer & HTTP Server (NGINX), and Host (AWS).
- [ ] Re-implement front-end using Vue.js or similar frameworks.
- [x] Re-design Node.Js back-end to be hybrid with more socials and countries. Design Patterns...

## License :copyright:

Author: [Antonio Scardace](https://linktr.ee/antonioscardace). <br/>
See ``LICENSE`` for more information.
