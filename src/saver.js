import getId from './idGenerator.js'
import { feeds, streams } from './store.js'
import { watchedState, render } from './index.js'

const saveRSS = (RSS, url) => {
    const id = getId();
    feeds.push({
        id,
        url,
        title: RSS.getElementsByTagName('title')[0].textContent,
        description: RSS.getElementsByTagName('description')[0].textContent,
    })
    watchedState.feeds = [...feeds];
    const posts = RSS.getElementsByTagName('item');
    [...posts].map((post) => {
        console.log(post.getElementsByTagName('title'))
        const title = post.getElementsByTagName('title')[0].textContent;
        const link = post.getElementsByTagName('link')[0].textContent;
        streams.push({
            id,
            title,
            link
        })
    })
    watchedState.posts = [...streams];
}

export default saveRSS;