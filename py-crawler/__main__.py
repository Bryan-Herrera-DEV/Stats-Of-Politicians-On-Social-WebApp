import schedule
import time

from datetime import datetime, timedelta

from classes.manager import Manager


def job():
    today = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    yesterday = today - timedelta(days=1)

    socials = Manager.get_socials()
    countries = Manager.get_countries()

    for country in countries:
        for social in socials:
            Manager.fetch_and_save(country, social, yesterday, today)


schedule.every().day.at("00:00:00").do(job)
while True:
    schedule.run_pending()
    time.sleep(1)
