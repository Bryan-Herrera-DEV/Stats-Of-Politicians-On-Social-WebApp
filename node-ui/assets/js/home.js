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

    let profiles = [];
        
    for (const group of groups)
        $('#cards-container').append(generateGroupCard(group.logo_color, group.name));    

    let mq_smartphone = window.matchMedia('(min-width: 320px) and (max-width: 480px)');
    let mq_tablet = window.matchMedia('(min-width: 768px) and (max-width: 1024px)');
    let fromTime = mq_smartphone.matches ? '5d' : (mq_tablet.matches ? '12d' : '3M');

    $('#iframe-num-followers').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=30&theme=light`);
    $('#iframe-num-tweets').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=32&theme=light`);
    $('#iframe-avg-len').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=29&theme=light`);
    $('#iframe-avg-likes').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=28&theme=light`);
    $('#iframe-avg-retweets').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=33&theme=light`);
    $('#iframe-avg-replies').attr('src', `https://localhost:3000/d-solo/CF0qDZB4z/politics-stats?orgId=1&from=now-${fromTime}&to=now-1d&panelId=31&theme=light`);

    for (const account of accounts) {
        profiles.push((await httpRequest(`api/twitter/accounts/${account.handle}/info`, 'GET'))[0]);
        
        const n = profiles.length - 1;
        const img_url = profiles[n]['profile_image_url'];
        const handle = profiles[n]['handle'];
        const pgroup = profiles[n]['political_group'];

        $('#accounts-container').append(generateAccountCard(img_url, handle, pgroup));
    }

    function searchAndRefresh() {
        $('#accounts-container').empty();
        const handle = $('#tag-to-search').val().toLowerCase();
        const contains = (elem) => elem.toLowerCase().includes(handle);

        for (const p of profiles)
            if (contains(p['political_group']) || contains(`@${p['handle']}`))
                $('#accounts-container').append(generateAccountCard(p['profile_image_url'], p['handle'], p['political_group']));
            
        $('.real-page *').animate({ opacity: '1' }, 0);
    }

    $('#search-tag').on('click', () => searchAndRefresh());
    $('#tag-to-search').on('keyup change', () => searchAndRefresh());
});