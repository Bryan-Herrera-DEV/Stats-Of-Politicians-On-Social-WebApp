from .twitter import TwitterAccount

class AccountCreator:

    @staticmethod
    def get_account(group, handle, social):
        if not group or not social or not handle: return None
        if not group.strip() or not social.strip() or not handle.strip(): return None

        if social == 'twitter': return TwitterAccount(handle, group)
        raise ValueError('Social Media not supported.')