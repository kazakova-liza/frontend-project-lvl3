
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
        value.map((item) => {
            const feed = document.createElement('ul');
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
        value.map((item) => {
            const post = document.createElement('a');
            post.href = item.link;
            post.textContent = item.title;
            posts.appendChild(post);
            const divider = document.createElement('br');
            posts.appendChild(divider);
        })
    }

    form.classList.add('was-validated');
}

export default render;



