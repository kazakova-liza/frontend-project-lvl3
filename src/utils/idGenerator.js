import { feeds } from '../store.js'

const getId = () => {
    let id;
    if (feeds.length !== 0) {
        const currentIds = feeds.map((feed) => feed.id);
        const uniqueIds = [...new Set(currentIds)];
        uniqueIds.sort((a, b) => b - a);
        id = uniqueIds[0] + 1;
    }
    else {
        id = 1;
    }
    return id;

}

export default getId;