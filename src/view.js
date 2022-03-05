import removeAllChildNodes from './utils/removeAllChildNodes.js';

const render = (path, value) => {
  const input = document.getElementsByClassName('form-control')[0];
  const invalidFeedback = document.getElementsByClassName('invalid-feedback')[0];
  const validFeedback = document.getElementsByClassName('valid-feedback')[0];
  const feeds = document.getElementsByClassName('feeds')[0];
  const posts = document.getElementsByClassName('posts')[0];
  const form = document.getElementsByClassName('form-control')[0];
  const addButton = document.getElementsByClassName('btn-primary')[0];
  if (path === 'valid') {
    if (value) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      form.readOnly = false;
      addButton.disabled = false;
    }
    // form.classList.add('was-validated');
  }
  if (path === 'invalidFeedback') {
    invalidFeedback.textContent = value;
  }
  if (path === 'validFeedback') {
    validFeedback.textContent = value;
  }
  if (path === 'feeds') {
    removeAllChildNodes(feeds);
    value.forEach((item) => {
      const feed = document.createElement('ul');
      feed.className = 'feed';
      const title = document.createElement('h3');
      title.textContent = item.title;
      const description = document.createElement('i');
      description.textContent = item.description;
      feed.appendChild(title);
      feed.appendChild(description);
      feeds.appendChild(feed);
    });
  }
  if (path === 'posts') {
    removeAllChildNodes(posts);
    value.forEach((item) => {
      const list = document.createElement('li');
      list.classList.add('d-flex', 'justify-content-between', 'align-items-start');
      const post = document.createElement('a');
      if (item.viewed) {
        post.classList.remove('fw-bold');
        post.classList.add('fw-normal');
        // console.log(`viewed: ${post.classList}`);
      } else {
        post.classList.remove('fw-normal');
        post.classList.add('fw-bold');
        // console.log(`not viewed: ${post.classList}`);
      }
      post.href = item.link;
      post.textContent = item.title;

      const button = document.createElement('button');
      button.name = 'Просмотр';
      button.textContent = 'Просмотр';
      button.classList.add('btn', 'btn-primary', 'btn-view');
      button.dataset.bsTarget = '#previewModal';
      button.dataset.bsToggle = 'modal';
      button.classList.add('btn-secondary');
      const thisPost = value.find((stream) => stream.title === item.title);
      button.id = thisPost.id;
      const modalTitle = document.getElementsByClassName('modal-title')[0];
      const modalBody = document.getElementsByClassName('modal-body')[0];
      button.onclick = () => {
        modalTitle.textContent = item.title;
        modalBody.textContent = item.description;
        item.viewed = true;
        post.classList.remove('fw-bold');
        post.classList.add('fw-normal');
        // console.log(`viewed: ${post.classList}`);
      };
      list.appendChild(post);
      list.appendChild(button);
      const divider = document.createElement('br');
      list.appendChild(divider);
      posts.appendChild(list);
    });
  }
};

export default render;
