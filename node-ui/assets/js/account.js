$(document).ready(async () => {
    const handle = getParamFromUrl('handle');

    try {    
        const profile = (await httpRequest(`/api/twitter/accounts/${handle}/info`))[0];
        const insights = (await httpRequest(`/api/twitter/accounts/${handle}/insights`))[0];

        const weekly_hashtags = await httpRequest(`/api/twitter/accounts/${handle}/hashtags/w/5`, 'GET');
        const monthly_hashtags = await httpRequest(`/api/twitter/accounts/${handle}/hashtags/m/5`, 'GET');
        const yearly_hashtags = await httpRequest(`/api/twitter/accounts/${handle}/hashtags/y/5`, 'GET');
        
        $('#name').text(profile['name']);
        $('#handle').text('@' + profile['handle']).attr('href', 'https://twitter.com/' + profile['handle']);
        $('#created').html('Account Created On: <b>' + normalizeDate(profile['created_on']) + '</b>');
        $('#profile_image').attr('src', profile['profile_image_url']);

        if (profile.verified)
            $('#verified').removeAttr('hidden');

        $('#followers').text(profile['followers_count']);
        $('#following').text(profile['following_count']);
        $('#tweets').text(profile['tot_tweets_count']);
        $('#fetched').text(insights['fetched_tweets_count']);

        descr = (profile.description.length > 0) ? profile['description'] : '⚠️ No description found. ⚠️';
        $('#description').text(descr);

        $('#tot_likes').text(insights['tot_likes']);
        $('#tot_retweets').text(insights['tot_retweets']);
        $('#tot_replies').text(insights['tot_replies']);
        $('#avg_likes').text(insights['avg_likes'].toFixed(2));
        $('#avg_length').html(insights['avg_len'].toFixed(2) + ' <sub>chars</sub>');
        $('#avg_retweets').text(insights['avg_retweets'].toFixed(2));
        $('#avg_replies').text(insights['avg_replies'].toFixed(2));
        $('#avg_sentiment').text(insights['avg_sentiment']);

        for (const hashtag of weekly_hashtags) 
            $('#hashtags_week').append(`<li><p>${hashtag.hashtag} (${hashtag.occurrences})</p></li>`);

        for (const hashtag of monthly_hashtags) 
            $('#hashtags_month').append(`<li><p>${hashtag.hashtag} (${hashtag.occurrences})</p></li>`);

        for (const hashtag of yearly_hashtags) 
            $('#hashtags_year').append(`<li><p>${hashtag.hashtag} (${hashtag.occurrences})</p></li>`);

        let mq_smartphone = window.matchMedia('(min-width: 320px) and (max-width: 480px)');
        let mq_tablet = window.matchMedia('(min-width: 768px) and (max-width: 1024px)');
        let fromTime = mq_smartphone.matches ? '1M' : (mq_tablet.matches ? '3M' : '6M');
        
        $('#iframe-num-followers').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=13&theme=light&var-account_name=${handle}`);
        $('#iframe-num-tweets').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=2&theme=light&var-account_name=${handle}`);
        $('#iframe-avg-len').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=14&theme=light&var-account_name=${handle}`);
        $('#iframe-avg-likes').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=15&theme=light&var-account_name=${handle}`);
        $('#iframe-avg-retweets').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=16&theme=light&var-account_name=${handle}`);
        $('#iframe-avg-replies').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=17&theme=light&var-account_name=${handle}`);
    }
    catch(err) {
        console.error('Error during loading.');
        errorInLoading();
    }
});