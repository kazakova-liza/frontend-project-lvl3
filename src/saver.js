import getId from './utils/idGenerator.js'
import processRss from './processor.js'


const updateRss = (url, watchedState, i18nextInstance, schema) => {
    processRss(url, false, watchedState, i18nextInstance, schema);
    setTimeout(() => updateRss(url, watchedState, i18nextInstance, schema), 5000);
}

const saveRSS = (RSS, url, newFlag, watchedState, i18nextInstance, schema) => {
    let id;
    let existingPosts;
    const title = RSS.getElementsByTagName('title')[0];
    const description = RSS.getElementsByTagName('description')[0];
    if (title === undefined || description === undefined) {
        throw (i18nextInstance.t('invalidRss'));
    }
    if (newFlag) {
        id = getId(watchedState);
        watchedState.feeds.push({
            id,
            url,
            title: title.textContent,
            description: description.textContent,
        })

    }
    else {
        id = watchedState.feeds.find((feed) => feed.url === url).id;
        existingPosts = watchedState.posts.filter((stream) => stream.id === id);
    }

    const posts = [...RSS.getElementsByTagName('item')];

    posts.map((post) => {
        const title = post.getElementsByTagName('title')[0].textContent;
        const link = post.getElementsByTagName('link')[0].textContent;
        const description = post.getElementsByTagName('description')[0].textContent;
        const stream = {
            id,
            title,
            link,
            description,
            viewed: false
        }

        if (newFlag) {
            watchedState.posts.push(stream);

        }
        else {
            const thisStream = existingPosts.find((stream) => stream.title === title);
            if (thisStream === undefined) {
                watchedState.posts.push(stream)
            }
        }

    })
    if (newFlag) {
        watchedState.validFeedback = i18nextInstance.t('success');
        watchedState.valid = true;
        updateRss(url, watchedState, i18nextInstance, schema);
    }
}

export default saveRSS;