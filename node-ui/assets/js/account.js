$(document).ready(async () => {
    const handle = getParamFromUrl('handle');

    try {    
        const profile = (await httpRequest(`/api/twitter/accounts/${handle}/info`))[0];
        const insights = (await httpRequest(`/api/twitter/accounts/${handle}/insights`))[0];

        const weekly_hashtags = await httpRequest(`/api/twitter/accounts/${handle}/hashtags/w/5`, 'GET');
        const monthly_hashtags = await httpRequest(`/api/twitter/accounts/${handle}/hashtags/m/5`, 'GET');
        const yearly_hashtags = await httpRequest(`/api/twitter/accounts/${handle}/hashtags/y/5`, 'GET');

        const followers_month = await httpRequest(`/api/twitter/accounts/${handle}/history/followers/m`, 'GET');
        const followers_year = await httpRequest(`/api/twitter/accounts/${handle}/history/followers/y`, 'GET');
        const lens_month = await httpRequest(`/api/twitter/accounts/${handle}/history/lens/m`, 'GET');
        const lens_year = await httpRequest(`/api/twitter/accounts/${handle}/history/lens/y`, 'GET');
        const likes_month = await httpRequest(`/api/twitter/accounts/${handle}/history/likes/m`, 'GET');
        const likes_year = await httpRequest(`/api/twitter/accounts/${handle}/history/likes/y`, 'GET');
        const retweets_month = await httpRequest(`/api/twitter/accounts/${handle}/history/retweets/m`, 'GET');
        const retweets_year = await httpRequest(`/api/twitter/accounts/${handle}/history/retweets/y`, 'GET');
        const replies_month = await httpRequest(`/api/twitter/accounts/${handle}/history/replies/m`, 'GET');
        const replies_year = await httpRequest(`/api/twitter/accounts/${handle}/history/replies/y`, 'GET');


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


        const month_dates = followers_month.map(elem => new Date(elem.date));
        const year_dates = followers_year.map(elem => new Date(elem.date));

        const followers_month_labels = followers_month.map(elem => elem.followers_count);
        const followers_year_labels = followers_year.map(elem => elem.followers_count);
        const lens_month_labels = lens_month.map(elem => elem.avg_len);
        const lens_year_labels = lens_year.map(elem => elem.avg_len);
        const likes_month_labels = likes_month.map(elem => elem.avg_likes);
        const likes_year_labels = likes_year.map(elem => elem.avg_likes);
        const retweets_month_labels = retweets_month.map(elem => elem.avg_retweets);
        const retweets_year_labels = retweets_year.map(elem => elem.avg_retweets);
        const replies_month_labels = replies_month.map(elem => elem.avg_replies);
        const replies_year_labels = replies_year.map(elem => elem.avg_replies);

        const unitTime = (year_dates.length > 125 ? 'quarter' : 'month');
        
        generateHistoryChart(document.getElementById('followers-within-month'), month_dates, followers_month_labels, 'Followers History in a Month', 'week');
        generateHistoryChart(document.getElementById('followers-within-year'), year_dates, followers_year_labels, 'Followers History in a Year', unitTime);
        generateHistoryChart(document.getElementById('lens-within-month'), month_dates, lens_month_labels, 'Tweets Length History in a Month', 'week');
        generateHistoryChart(document.getElementById('lens-within-year'), year_dates, lens_year_labels, 'Tweets Length History in a Year', unitTime);
        generateHistoryChart(document.getElementById('likes-within-month'), month_dates, likes_month_labels, 'Likes History in a Month', 'week');
        generateHistoryChart(document.getElementById('likes-within-year'), year_dates, likes_year_labels, 'Likes History in a Year', unitTime);
        generateHistoryChart(document.getElementById('retweets-within-month'), month_dates, retweets_month_labels, 'Retweets History in a Month', 'week');
        generateHistoryChart(document.getElementById('retweets-within-year'), year_dates, retweets_year_labels, 'Retweets History in a Year', unitTime);
        generateHistoryChart(document.getElementById('replies-within-month'), month_dates, replies_month_labels, 'Replies History in a Month', 'week');
        generateHistoryChart(document.getElementById('replies-within-year'), year_dates, replies_year_labels, 'Replies History in a Year', unitTime);

        
        finishLoading();
    }
    catch(err) {
        console.error('Error during loading.');
        errorInLoading();
    }
});