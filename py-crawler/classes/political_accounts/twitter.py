import re

from functools import reduce
from time import sleep

from .account import Account
from ..apis.twitter import TwitterApi
from ..text_analysis import TextAnalysis

class TwitterAccount(Account):

    def __init__(self, handle, group):
        self.hashtags = []
        self.tweets = []
        self.group = group
        self.username = handle

    def fetch_data(self, start_time, end_time):
        twitter = TwitterApi()
        
        while True:
            try:
                info = twitter.get_user_info_by_handle(self.username)
                tweets = twitter.get_user_tweets_within_dates(info['id'], start_time, end_time)
                break
            except:
                print('Too much requests on Twitter APIs. Wait 3 mins.', flush=True)
                sleep(180)

        tweets = filter((lambda tweet: not tweet['text'].startswith('RT')), tweets)
        [self.tweets.append(tweet) for tweet in tweets]

        self.hashtags = self.get_used_hashtags()

        self.id = info['id']
        self.name = info['name']
        self.created_on = info['created_at']
        self.descr = info['description']
        self.profile_img_url = info['profile_image_url'].replace('_normal', '')
        self.verified = bool(int(info['verified']))
        self.followers_count = info['public_metrics']['followers_count']
        self.following_count = info['public_metrics']['following_count']
        self.tweet_count = info['public_metrics']['tweet_count']

    def get_fetched_tweets_today(self):
        return len(self.tweets)

    def get_sum_metric(self, metric):
        if self.get_fetched_tweets_today() <= 0: return 0
        mtrs = map((lambda tweet: tweet['public_metrics'][metric]), self.tweets)
        return reduce((lambda curr, sum: curr + sum), mtrs)

    def get_avg_metric_per_tweet(self, metric):
        if self.get_fetched_tweets_today() <= 0: return 0
        return self.get_sum_metric(metric) / self.get_fetched_tweets_today()

    def get_avg_tweet_len(self):
        if self.get_fetched_tweets_today() <= 0: return 0
        lens = map((lambda tweet: len(tweet['text'])), self.tweets)
        return reduce((lambda curr, sum: curr + sum), lens) / self.get_fetched_tweets_today()
    
    def get_avg_sentiment(self):
        if self.get_fetched_tweets_today() <= 0: return 'Null'
        texts = map((lambda tweet: tweet['text']), self.tweets)
        avg_com = TextAnalysis.get_avg_sentiment(texts, len(self.tweets))
        return TextAnalysis.get_sentiment_mark(avg_com)

    def get_used_hashtags(self):
        if self.get_fetched_tweets_today() <= 0: return []
        texts = map((lambda tweet: tweet['text']), self.tweets)
        hashtags_list = [re.findall(r"(#\w+)", text, re.MULTILINE) for text in texts]
        hashtags_flatlist = [hashtag for tweets_ht in hashtags_list for hashtag in tweets_ht]
        return [elem for elem in hashtags_flatlist if elem != []]