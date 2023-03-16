$(document).ready(async () => {
    const name = getParamFromUrl('name');

    try {
        const info = (await httpRequest(`/api/twitter/groups/${name}/info`, 'GET'))[0];
        const stats = (await httpRequest(`/api/twitter/groups/${name}/insights`, 'GET'))[0];

        const accounts = await httpRequest(`/api/twitter/accounts/${name}/all`, 'GET');

        const followers_month = await httpRequest(`/api/twitter/groups/${name}/history/followers/m`, 'GET');
        const followers_year = await httpRequest(`/api/twitter/groups/${name}/history/followers/y`, 'GET');
        const lens_month = await httpRequest(`/api/twitter/groups/${name}/history/lens/m`, 'GET');
        const lens_year = await httpRequest(`/api/twitter/groups/${name}/history/lens/y`, 'GET');
        const likes_month = await httpRequest(`/api/twitter/groups/${name}/history/likes/m`, 'GET');
        const likes_year = await httpRequest(`/api/twitter/groups/${name}/history/likes/y`, 'GET');
        const retweets_month = await httpRequest(`/api/twitter/groups/${name}/history/retweets/m`, 'GET');
        const retweets_year = await httpRequest(`/api/twitter/groups/${name}/history/retweets/y`, 'GET');
        const replies_month = await httpRequest(`/api/twitter/groups/${name}/history/replies/m`, 'GET');
        const replies_year = await httpRequest(`/api/twitter/groups/${name}/history/replies/y`, 'GET');


        $('#name').text(info['name']);
        $('#color').css('background', info['logo_color']);

        $('#followers').text(stats['followers_count']);
        $('#tweets').text(stats['tot_tweets_count']);
        $('#accs').text(stats['num_analyzed_accounts']);
        $('#fetched').text(stats['fetched_tweets_count']);

        $('#tot_likes').text(stats['tot_likes']);
        $('#tot_retweets').text(stats['tot_retweets']);
        $('#tot_replies').text(stats['tot_replies']);
        $('#avg_likes').text(stats['avg_likes'].toFixed(2));
        $('#avg_length').html(stats['avg_len'].toFixed(2) + '<sub> chars</sub>');
        $('#avg_retweets').text(stats['avg_retweets'].toFixed(2));
        $('#avg_replies').text(stats['avg_replies'].toFixed(2));
        $('#avg_sentiment').text(stats['avg_sentiment']);


        for (const account of accounts) 
            $('#handles').append(`<li class='list-group-item'><a href='account.html?handle=${account.handle}'>@${account.handle}</a></li>`);

        
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