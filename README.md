# Stats-Of-Politicians-On-Social-WebApp

_Personal Project for Politicians Analysis_

## Introduction

The project aims to make stats about the use of Social Media by Politicians.
It analyzes on any social media, politicians of more countries, of any political group.

## Structure

The structure of the project is designed below.
All the components have been created on Docker.

- **Health Checker | Python & YAML**: it checks every second the health of all Docker containers. On error (and online return) it sends notifications on Telegram and-or Slack.
- **Crawler | Python & YAML**: once at a day it reads the YML file (countries, socials, and accounts we have to analyze), fetches all the data, and save them into the database.
- **Database | MySQL**: stores all the data sent by the Crawler updated day-by-day.
- **Charts | Grafana**: it makes and provides a lot of charts with data fetched from the database.
- **UI | Node.Js, HTML, CSS, JS**: fetches and visualizes (even using Grafana) all the data from the database.

<img src="/docs/imgs/schema.png" width="725px"/>

### Config File (YML)

It is useful to store socials, countries, accounts, and political groups to analyze. <br/>
I use a YML file rather than a relational DB, because it is more easier to update and store.

Here is an example of what it contains:

![YAML Example](/docs/imgs/yaml.png)

### Crawler (Python)

Everyday, at **00:00 AM UTC**, it starts a job with three main phases managed by ```Manager```.

- **Reading**: it reads from the YML config file all the info necessary to make stats. Precisely, it contains socials, countries and their respective political groups and accounts we want to analyze. 
- **Fetching & Processing**: for each social and country, it retrieves data for each account for the day that just passed, and it puts them into an ```Account``` object (one for each account). Once made a list of accounts' objects, it instantiates a ```Group``` object. These objects make all the stats required for the last 24hrs.
- **Saving**: once made all accounts and politics groups' objects associated with a given country on a given social, the data are saved throught a ```Helper``` into a database.

Below is illustrated a semplified UML of the crawler. <br/>
It has to be noticed that ```Account```, ```Group```, and ```Helper``` use a **Factory Method Design Pattern**. 

<img src="/docs/uml/crawler.svg" width="750px"/>

### Database (MySQL)

The DBMS which I have chosen to store all the data is MySQL, a relational DBMS. <br/>
Let's see the E-R and the Logical schema.

<img src="/docs/uml/db.svg" width="750px"/>
<br/>
<img src="/docs/imgs/db.png" width="750px"/>

### UI (Node.js, HTML, CSS, JS)

UI has been implemented using HTML, CSS (Bootstrap), and JS (JQuery). <br/>
On request, via REST APIs using AJAX, the Node.js back-end connects to the MySQL database and returns in JSON format to the front-end what it has asked for.

Let's see the available APIs at this moment:

| Route | Description |
| ----- | --------------- |
| ``/api/countries`` | gets all coutries (e.g. ITA) |
| ``/api/:country/groups`` | gets all political groups of _:country_ analysed yesterday |
| ``/api/:country/:social/accounts`` | gets all accounts of _:country_ on _:social_ analysed yesterday |
| ``/api/:social/groups/:group/info`` | gets yesterday info about _:group_ on _:social_ |
| ``/api/:social/groups/:group/insights`` | gets yesterday insights about _:group_ on _:social_ |
| ``/api/:social/accounts/:group/all`` | gets all accounts in _:group_ on _:social_ analysed yesterday |
| ``/api/:social/accounts/:handle/info`` | gets yesterday info about _:handle_ on _:social_ |
| ``/api/:social/accounts/:handle/insights`` | gets yesterday insights about _:handle_ on _:social_ |
| ``/api/:social/accounts/:handle/hashtags/:since/:limit`` | gets top _:limit_ used hashtags by _:handle_ since _:since_ (``w``, ``m``, ``y``) |

## Provided Statistics

- For Twitter:
  - For Each Account and Political Group:
    - Total Likes (yesterday)
    - Total Retweets (yesterday)
    - Total Replies (yesterday)
    - Average Likes (yesterday)
    - Average Retweets (yesterday)
    - Average Replies (yesterday)
    - Average Length of a Tweet (in characters)
    - Average Sentiment Analysis (Positive, Negative, Neutral, Null) (yesterday) <br/><br/>
    - Chart with the History of Number of Analysed Tweets Over Time
    - Chart with the History of Total Followers Over Time
    - Chart with the History of Avg Tweets Length Over Time
    - Chart with the History of Avg Likes Over Time
    - Chart with the History of Avg Retweets Over Time
    - Chart with the History of Avg Replies Over Time
    - Top 5 Most Used Hashtags **(just for accounts)** (last week, last month, last year) <br/><br/>
    - Charts of Compare Among All Political Groups (followers, likes, etc.)


## Light Demo

![Screen 1](/docs/snaps/screen-0.png)
---
![Screen 2](/docs/snaps/screen-1.png)
---
![Screen 3](/docs/snaps/screen-2.png)
---
![Screen 4](/docs/snaps/screen-3.png)
---
![Screen 5](/docs/snaps/screen-4.png)
***
![Screen 6](/docs/snaps/screen-5.png)
---
![Screen 7](/docs/snaps/screen-6.png)
---
![Screen 8](/docs/snaps/screen-7.png)
---
![Screen 9](/docs/snaps/screen-8.png)
---
![Screen 10](/docs/snaps/screen-9.png)
***
![Screen 11](/docs/snaps/screen-10.png)
---
![Screen 12](/docs/snaps/screen-11.png)
***
![Screen 13](/docs/snaps/screen-12.png)

## Getting Started

So that the repository is successfully cloned and project run smoothly, a few steps need to be followed.

### Requisites

* A stable internet connection. 
* Use of Linux, MacOS, or Windows WSL.
* Having a Twitter Developer Account with related keys and tokens (for Twitter).
* Having a Telegram Bot (with related channel) or a Slack WebHook.
* Need to download and install [Docker](https://docs.docker.com/get-docker/) ([Docker Desktop](https://www.docker.com/products/docker-desktop/) is recommended).
* The use of [Visual Studio Code](https://code.visualstudio.com/download) is strongly recommended for modify.

### Installation and Use

```sh
   $ git clone https://github.com/antonioscardace/Stats-Of-Politicians-On-Socials-WebApp.git
   $ cd YOUR_PATH/Stats-Of-Politicians-On-Socials-WebApp/
   $ bash run.sh
``` 

### Useful Links

| Title | Link |
| ----- | ---- |
| Node-UI | [http://localhost:8080/](http://localhost:8080/) |
| Grafana-Charts | [https://localhost:3000/](https://localhost:3000/) |

## To Do Improvements

- [ ] Add other countries in addition to Italy.
- [ ] Add other socials (e.g. Instagram).
- [ ] Add other NLP stats (e.g. Emotion Detection).
- [ ] Take a look at: HTTPS, Domain, Load Balancer & HTTP Server (NGINX), Host (AWS).
- [ ] Re-implement front-end using Vue.js or similar.
- [ ] Re-design Node.Js back-end to be hybrid with more socials and countries. Design Patterns...

## License :copyright:

Author: [Antonio Scardace](https://linktr.ee/antonioscardace). <br/>
See ``LICENSE`` for more information.
