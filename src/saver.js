import getId from './idGenerator.js'
import { feeds, streams } from './store.js'
import { watchedState } from './index.js'

const saveRSS = (RSS, url, newFlag) => {
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
        const stream = {
            id,
            title,
            link
        }

        if (newFlag) {
            streams.push(stream);
            watchedState.posts = [...streams];
        }
        else {
            const thisStream = existingPosts.find((stream) => stream.title === title);
            if (thisStream === undefined) {
                streams.push(stream)
                watchedState.posts = [...streams];
            }
        }

    })
}

export default saveRSS;