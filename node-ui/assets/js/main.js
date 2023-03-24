function normalizeDate(d) {
    const date = new Date(d);
    return date.toLocaleString('en-GB');
}

function getParamFromUrl(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

function errorInLoading() {
    $('.loading-page').append('<div class="alert alert-danger" role="alert">Error: check parameters. <a href="/">Go Back Home.</a></div>');
}

function finishLoading() {
    if (--charts == 0) {
        $('.loader').animate({ opacity: '0' }, 1100);
        $('.loading-page p').animate({ opacity: '0' }, 1100);
        setTimeout(() => $('.loading-page').css('display', 'none'), 1100);

        setTimeout(() => { $('.real-page').css('display', 'contents'); }, 1100);
        setTimeout(() => { $('.real-page *').animate({ opacity: '1' }, 1000); }, 1100);
    }
}

function refreshChart(this_button) {
    let id = $(this_button).closest('.line-chart').find('iframe').attr('id');
    $('#' + id).attr('src', $('#' + id).attr('src'));
}

async function httpRequest(url, method) {
    return await new Promise((resolve, reject) => {
        $.ajax({
            method: method,
            url: url,
            dataType: 'json',
            success: (res) => resolve(res),
            error: (xhr) => reject(xhr.responseJSON.message)
        });
    });
}

