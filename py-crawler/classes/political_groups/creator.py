from .twitter import TwitterGroup

class GroupCreator:

    @staticmethod
    def get_group(accounts, color, country, name, social):
        if not accounts or not color or not country or not name or not social: return None
        if not color.strip() or not country.strip() or not name.strip() or not social.strip(): return None

        if social == 'twitter': return TwitterGroup(accounts, color, country, name)
        raise ValueError('Social Media not supported.')