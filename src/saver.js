import getId from './utils/idGenerator.js'
import { feeds, streams } from './store.js'
import processRss from './processor.js'


const updateRss = (url) => {
    processRss(url, false);
    setTimeout(() => updateRss(url), 5000);
}

const saveRSS = (RSS, url, newFlag, watchedState) => {
    let id;
    let existingPosts;
    if (newFlag) {
        id = getId();
        feeds.push({
            id,
            url,
            title: RSS.getElementsByTagName('title')[0].textContent,
            description: RSS.getElementsByTagName('description')[0].textContent,
        })
        watchedState.feeds = [...feeds];

    }
    else {
        id = feeds.find((feed) => feed.url === url).id;
        existingPosts = streams.filter((stream) => stream.id === id);
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
            streams.push(stream);

        }
        else {
            const thisStream = existingPosts.find((stream) => stream.title === title);
            if (thisStream === undefined) {
                streams.push(stream)
            }
        }

    })
    watchedState.posts = [...streams];
    if (newFlag) {
        updateRss(url);
    }
}

export default saveRSS;