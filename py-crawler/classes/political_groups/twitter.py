from functools import reduce

from .group import Group

class TwitterGroup(Group):

    def __init__(self, accounts, color, country, name):
        self.accounts = accounts
        self.color = color
        self.country = country
        self.name = name

    def get_avg_metric_of_tweets(self, metric):
        mtrs = map((lambda account: account.get_avg_metric_per_tweet(metric)), self.accounts)
        return reduce((lambda curr, sum: curr + sum), mtrs) / len(self.accounts)

    def get_avg_tweet_len(self):
        lens = map((lambda account: account.get_avg_tweet_len()), self.accounts)
        return reduce((lambda curr, sum: curr + sum), lens) / len(self.accounts)

    def get_most_freq_sentiment(self):
        sents = map((lambda account: account.get_avg_sentiment()), self.accounts)
        non_null = list(filter((lambda sent: sent != 'Null'), sents))
        return 'Null' if len(non_null) == 0 else max(set(non_null), key = non_null.count)
    
    def get_num_of_analyzed_accounts(self):
        return len(self.accounts)
    
    def get_sum_metric(self, metric):
        mtrs = map((lambda account: account.get_sum_metric(metric)), self.accounts)
        return reduce((lambda curr, sum: curr + sum), mtrs)

    def get_total_followers_count(self):
        frs = map((lambda account: account.followers_count), self.accounts)
        return reduce((lambda curr, sum: curr + sum), frs)
    
    def get_total_fetched_tweet_count(self):
        fts = map((lambda account: account.get_fetched_tweets_today()), self.accounts)
        return reduce((lambda curr, sum: curr + sum), fts)
    
    def get_total_tweet_count(self):
        tws = map((lambda account: account.tweet_count), self.accounts)
        return reduce((lambda curr, sum: curr + sum), tws)