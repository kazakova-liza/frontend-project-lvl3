import getId from './idGenerator.js'
import { feeds, streams } from './store.js'

const saveRSS = (RSS, url) => {
    const id = getId();
    feeds.push({
        id,
        url,
        title: RSS.getElementsByTagName('title')[0].textContent,
        description: RSS.getElementsByTagName('description')[0].textContent,
    })
    const posts = RSS.getElementsByTagName('item');
    [...posts].map((post) => {
        const title = post.getElementsByTagName('title')[0].textContent;
        const link = post.getElementsByTagName('link')[0].textContent;
        streams.push({
            id,
            title,
            link
        })
    })
    console.log(streams);

}

export default saveRSS;