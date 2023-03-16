const generateGroupCard = (color, name) => `
        <div class='card'>
            <div class='color' style='background:${color}'></div>
            <p class='name'>${name}</p>
            <button type='button' class='btn' onclick='location.href="group.html?name=${name}"'>Learn More</button>
        </div>`;

const generateAccountCard = (profile_image_url, handle, group) => `
        <div class='card'>
            <img src='${profile_image_url}'/>
            <div class='info'>
                <p class='name'>@${handle}</p>
                <p class='group'>${group}</p>
            </div>
            <button type='button' class='btn btn-danger' onclick='location.href="account.html?handle=${handle}"'>Learn More</button>
        </div>`;


$(document).ready(async () => {
    const groups = await httpRequest(`/api/ITA/groups`, 'GET');
    const accounts = await httpRequest(`/api/ITA/twitter/accounts`, 'GET');

    let names = [];
    let colors = [];

    let dates = [];

    let followers = [];
    let fetched_tweets = [];
    let likes = [];
    let retweets = [];
    let replies = [];
    let lens = [];

    let profiles = [];

    for (const group of groups) {
        $('#cards-container').append(generateGroupCard(group.logo_color, group.name));
        
        const followers_inmonth = await httpRequest(`/api/twitter/groups/${group.name}/history/followers/w`, 'GET');
        const fetched_tweets_inmonth = await httpRequest(`/api/twitter/groups/${group.name}/history/fetched/w`, 'GET');
        const likes_inmonth = await httpRequest(`/api/twitter/groups/${group.name}/history/likes/w`, 'GET');
        const retweets_inmonth = await httpRequest(`/api/twitter/groups/${group.name}/history/retweets/w`, 'GET');
        const replies_inmonth = await httpRequest(`/api/twitter/groups/${group.name}/history/replies/w`, 'GET');
        const lens_inmonth = await httpRequest(`/api/twitter/groups/${group.name}/history/lens/w`, 'GET');

        names.push(group.name);
        colors.push(group.logo_color);

        dates.push(followers_inmonth.map(elem => elem.date));

        followers.push(followers_inmonth.map(elem => elem.followers_count));
        fetched_tweets.push(fetched_tweets_inmonth.map(elem => elem.fetched_tweets_count));
        likes.push(likes_inmonth.map(elem => elem.avg_likes.toFixed(2)));
        retweets.push(retweets_inmonth.map(elem => elem.avg_retweets.toFixed(2)));
        replies.push(replies_inmonth.map(elem => elem.avg_replies.toFixed(2)));
        lens.push(lens_inmonth.map(elem => elem.avg_len.toFixed(2)));
    }

    generateHistoryCompareChart('tot-followers', names, colors, dates, followers, 'Total Number of Followers', 'day');
    generateHistoryCompareChart('tot-fetched-tweets', names, colors, dates, fetched_tweets, 'Total Number of Fetched Tweets', 'day');
    generateHistoryCompareChart('avg-likes', names, colors, dates, likes, 'Average Likes', 'day');
    generateHistoryCompareChart('avg-retweets', names, colors, dates, retweets, 'Average Retweets', 'day');
    generateHistoryCompareChart('avg-replies', names, colors, dates, replies, 'Average Replies', 'day');
    generateHistoryCompareChart('avg-lens', names, colors, dates, lens, 'Average Tweets Length', 'day');


    for (const account of accounts) {
        let n = profiles.length;
        profiles.push((await httpRequest(`api/twitter/accounts/${account.handle}/info`, 'GET'))[0]);
        $('#accounts-container').append(generateAccountCard(profiles[n]['profile_image_url'], profiles[n]['handle'], profiles[n]['political_group']));
    }

    $('#search-tag').on('click', () => {
        let handle = $('#tag-to-search').val().toLowerCase();
        if (handle.charAt(0) == 'c') handle = handle.substring(1);
        
        $('#accounts-container').empty();
        for (const profile of profiles) {
            if (profile['handle'].toLowerCase().includes(handle) ||
                profile['political_group'].toLowerCase().includes(handle)) {
                $('.real-page *').animate({ opacity: '1' }, 0);
                $('#accounts-container').append(generateAccountCard(profile['profile_image_url'], profile['handle'], profile['political_group']));
            }
        }
    });

    
    finishLoading();
});