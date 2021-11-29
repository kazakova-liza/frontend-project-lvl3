import getId from './utils/idGenerator.js'
import processRss from './processor.js'


const updateRss = (url, watchedState, i18nextInstance) => {
    processRss(url, false, watchedState, i18nextInstance);
    setTimeout(() => updateRss(url, watchedState, i18nextInstance), 5000);
}

const saveRSS = (RSS, url, newFlag, watchedState, i18nextInstance) => {
    let id;
    let existingPosts;
    if (newFlag) {
        id = getId(watchedState);
        watchedState.feeds.push({
            id,
            url,
            title: RSS.getElementsByTagName('title')[0].textContent,
            description: RSS.getElementsByTagName('description')[0].textContent,
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
        updateRss(url, watchedState, i18nextInstance);
    }
}

export default saveRSS;