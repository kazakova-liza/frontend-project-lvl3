
import removeAllChildNodes from './utils.js'
import { streams } from './store.js'


const render = (path, value, previousValue, applyData) => {
    const form = document.getElementsByClassName('form-control')[0];
    const feedback = document.getElementsByClassName('invalid-feedback')[0];
    const feeds = document.getElementsByClassName('feeds')[0];
    const posts = document.getElementsByClassName('posts')[0];
    if (path === 'state') {
        if (value) {
            form.classList.add('is-valid');
        }
        else {
            form.classList.add('is-invalid');
        }
    }
    if (path === 'error') {
        feedback.textContent = value;
    }
    if (path === 'feeds') {
        removeAllChildNodes(feeds);
        value.map((item) => {
            const feed = document.createElement('ul');
            feed.className = 'feed';
            const title = document.createElement('h3');
            title.textContent = item.title;
            const description = document.createElement('i');
            description.textContent = item.description;
            feed.appendChild(title);
            feed.appendChild(description);
            feeds.appendChild(feed);
        })
    }
    if (path === 'posts') {
        removeAllChildNodes(posts);
        value.map((item) => {
            const list = document.createElement('li');
            list.className = 'justify-content-between';
            const post = document.createElement('a');
            post.className = item.viewed ? 'fw-normal' : 'fw-bold';
            post.href = item.link;
            post.textContent = item.title;

            const button = document.createElement('button');
            button.textContent = 'View';
            button.className = 'btn-view';
            button.dataset.bsTarget = "#previewModal";
            button.dataset.bsToggle = 'modal';
            button.classList.add('btn-secondary');
            const thisPost = streams.find((stream) => stream.title === item.title);
            button.id = thisPost.id;
            const modalTitle = document.getElementsByClassName('modal-title')[0];
            const modalBody = document.getElementsByClassName('modal-body')[0];
            button.onclick = () => {
                modalTitle.textContent = item.title;
                modalBody.textContent = item.description;
                item.viewed = true;
            }
            list.appendChild(post);
            list.appendChild(button);
            const divider = document.createElement('br');
            list.appendChild(divider);
            posts.appendChild(list);
        })
    }

    form.classList.add('was-validated');
}

export default render;



