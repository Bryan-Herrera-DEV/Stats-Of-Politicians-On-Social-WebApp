# Stats-Of-Politicians-On-Social-WebApp

_Personal Project for Politicians Analysis_

## Introduction

The project aims to make stats about the use of Social Media by Politicians.
It analyzes on any social media, politicians of more countries, of any political group.

## Structure

The structure of the project is designed below.
All the components have been created on Docker.

- **Config file (.yml)**: has been created to store countries, socials, and accounts we have to analyze.
- **Crawler | Python**: once at a day it reads the YML file, fetches all the data, and save them into the db.
- **Database | MySQL**: stores all the data sent by the Crawler.
- **UI | NodeJs, HTML, CSS, JS**: fetches and visualize all the data from the database.

![Project Schema](/docs/imgs/schema.png)

### Config File (YML)

It is useful to store socials, countries, accounts, and political groups to analyze. <br/>
I use a YML file rather than a relational DB, because it is more easier to update and store.

Here is an example of what it contains:

```socials``` : _twitter_, _facebook_ <br/>
```countries``` : _ITA_, _USA_ <br/>
```ITA_groups``` : (_M5S, #aabbcc_), (_FDI, #112233_) <br/>
```ITA_twitter_accounts``` : (_@GiuseppeConteIT, M5S_), (_@GiorgiaMeloni, FDI_)

### Crawler (Python)

Everyday, at 00:00 AM tz:UTC, it start a job with three main phases managed by ```Manager```.

- **Reading**: it reads from the YML config file, all the info mandatory to make stats.
- **Fetching & Processing**: for each social and country, it retrieves data for each account for the day that just passed, and it puts them into an ```Account``` object (one for each account). Once made a list of accounts object, it instantiates a ```Group``` object. These objects make all the stats required for the last 24hrs.
- **Saving**: once made all accounts and politics group objects associated with a given country on a given social, the data are saved throught a ```Helper``` into a database. A relational database (MySQL) has been chosen.

Below is illustrated a semplified UML of the crawler. <br/>
It has to be noticed that ```Account```, ```Group```, and ```Helper``` use a **Factory Method Design Pattern**. 

![Crawler UML](/docs/uml/crawler.svg)

### Database (MySQL)

The DBMS which I have chosen to store all the data is MySQL, a relational DBMS. <br/>
It is best suitable for simple operations like write and reading, it is reliable, simple, and faster, etc. <br/>

![Logical DB](/docs/imgs/db.png)

### UI (Node, HTML, CSS, JS)

NodeJs connects to MySQL. <br/>
UI has been implemented using HTML, CSS, and JS. <br/>
On request, via REST APIs using AJAX, NodeJs returns what we need.

Below is illustrated a semplified UML of how the NodeJs server is organized. <br/>

![Server UML](/docs/uml/node.svg)


## Provided Statistics

- For Twitter:
  - For Each Account and Political Group:
    - Total Likes
    - Total Retweets
    - Total Replies
    - Average Likes
    - Average Retweets
    - Average Replies
    - Average Length of a Tweet (in characters)
    - Average Sentiment Analysis (Positive, Negative, Neutral, Null)
    - Chart with the Chronology of Followers Over Time (last week, last month, last year)
    - Chart with the Chronology of Avg Likes Over Time (last week, last month, last year)
    - Top 10 Most Used Hashtags (just for accounts)


## Light Demo

![Screen 1](/docs/snaps/screen-1.png)
----
![Screen 2](/docs/snaps/screen-2.png)
----
![Screen 3](/docs/snaps/screen-3.png)
----
![Screen 4](/docs/snaps/screen-4.png)
----
![Screen 5](/docs/snaps/screen-5.png)
----
![Screen 6](/docs/snaps/screen-6.png)


## Getting Started

So that the repository is successfully cloned and project run smoothly, a few steps need to be followed.

### Requisites

* A good internet connection and a lot of memory space are required. 
* Use of Linux, MacOS, or Windows WSL.
* Need to download and install [Docker](https://docs.docker.com/get-docker/) ([Docker Desktop](https://www.docker.com/products/docker-desktop/) is recommended).
* The use of [Visual Studio Code](https://code.visualstudio.com/download) is strongly recommended for modify.

### Installation and Use

```sh
   $ git clone https://github.com/antonioscardace/Stats-Of-Politicians-On-Socials-WebApp.git
   $ cd YOUR_PATH/Stats-Of-Politicians-On-Socials-WebApp/
   $ bash run.sh
``` 

## License :copyright:

Author: [Antonio Scardace](https://antonioscardace.altervista.org/). <br/>
See ``LICENSE`` for more information.
