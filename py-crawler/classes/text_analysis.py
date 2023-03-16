from functools import reduce

from deep_translator import GoogleTranslator
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

class TextAnalysis:

    @staticmethod
    def translate(text):
        if not text.strip() or text.isnumeric(): return ''
        return GoogleTranslator(source='auto', target='en').translate(text) 

    @staticmethod
    def get_avg_sentiment(texts, n):
        texts = map((lambda text: TextAnalysis.translate(text)), texts)
        coms = map((lambda text: TextAnalysis.get_compound(text)), texts)
        return reduce((lambda curr, sum: curr + sum), coms) / n 

    @staticmethod
    def get_compound(text):
        return TextAnalysis.get_sentiment_values(text)['compound']
    
    @staticmethod
    def get_sentiment_mark(compound):
        if (compound) <= -0.05: return 'Negative'
        elif (compound) >= 0.05: return 'Positive'
        return 'Neutral'

    @staticmethod
    def get_sentiment_values(text):
        vader = SentimentIntensityAnalyzer()
        return vader.polarity_scores(text)