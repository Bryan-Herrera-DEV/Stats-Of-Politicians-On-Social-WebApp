$(document).ready(async () => {
    const name = getParamFromUrl('name');

    try {
        const info = (await httpRequest(`/api/twitter/groups/${name}/info`, 'GET'))[0];
        const stats = (await httpRequest(`/api/twitter/groups/${name}/insights`, 'GET'))[0];

        const accounts = await httpRequest(`/api/twitter/accounts/${name}/all`, 'GET');

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

        let mq_smartphone = window.matchMedia('(min-width: 320px) and (max-width: 480px)');
        let mq_tablet = window.matchMedia('(min-width: 768px) and (max-width: 1024px)');
        let fromTime = mq_smartphone.matches ? '1M' : (mq_tablet.matches ? '3M' : '6M');
        
        $('#iframe-num-followers').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=19&theme=light&var-group_name=${name}`);
        $('#iframe-num-tweets').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=21&theme=light&var-group_name=${name}`);
        $('#iframe-avg-len').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=22&theme=light&var-group_name=${name}`);
        $('#iframe-avg-likes').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=23&theme=light&var-group_name=${name}`);
        $('#iframe-avg-retweets').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=24&theme=light&var-group_name=${name}`);
        $('#iframe-avg-replies').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=25&theme=light&var-group_name=${name}`);
    }
    catch(err) {
        console.error('Error during loading.');
        errorInLoading();
    }
});