import removeAllChildNodes from './utils/removeAllChildNodes.js';

const render = (path, value, i18nextInstance, elements) => {
  console.log(elements);
  // const { pageElements } = elements;
  const pageElements = { ...elements };
  console.log(pageElements);
  if (path === 'status') {
    console.log(value);
    switch (value) {
      case 'input': {
        // form.value = '';
        pageElements.input.readOnly = false;
        pageElements.addButton.disabled = false;
        pageElements.input.classList.remove('is-invalid');
        pageElements.input.classList.remove('is-valid');
        break;
      }
      case 'valid': {
        pageElements.input.classList.remove('is-invalid');
        pageElements.input.classList.add('is-valid');
        pageElements.input.readOnly = false;
        pageElements.addButton.disabled = false;
        break;
      }
      case 'invalid': {
        pageElements.input.classList.add('is-invalid');
        pageElements.input.classList.remove('is-valid');
        pageElements.input.readOnly = false;
        pageElements.addButton.disabled = false;
        break;
      }
      case 'loading': {
        pageElements.input.classList.remove('is-invalid');
        pageElements.input.classList.add('is-valid');
        pageElements.input.readOnly = true;
        pageElements.addButton.disabled = true;
        break;
      }
      case 'success': {
        pageElements.input.classList.remove('is-invalid');
        pageElements.input.classList.add('is-valid');
        pageElements.input.readOnly = false;
        pageElements.addButton.disabled = false;
        break;
      }
      case 'error': {
        pageElements.input.classList.add('is-invalid');
        pageElements.input.classList.remove('is-valid');
        pageElements.input.readOnly = false;
        pageElements.addButton.disabled = false;
        break;
      }
      default:
        break;
    }
  }
  if (path === 'feedback') {
    console.log(value);
    pageElements.invalidFeedback.textContent = '';
    pageElements.validFeedback.textContent = '';
    if (value === 'success') {
      pageElements.validFeedback.textContent = i18nextInstance.t('success');
    } else {
      pageElements.invalidFeedback.textContent = i18nextInstance.t(value);
    }
  }

  if (path === 'feeds') {
    removeAllChildNodes(pageElements.feeds);
    value.forEach((item) => {
      const feed = document.createElement('ul');
      feed.className = 'feed';
      const title = document.createElement('h3');
      title.textContent = item.title;
      const description = document.createElement('i');
      description.textContent = item.description;
      feed.appendChild(title);
      feed.appendChild(description);
      pageElements.feeds.appendChild(feed);
    });
  }
  if (path === 'posts') {
    removeAllChildNodes(pageElements.posts);
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
        // item.viewed = true;
        post.classList.remove('fw-bold');
        post.classList.add('fw-normal');
        // console.log(`viewed: ${post.classList}`);
      };
      list.appendChild(post);
      list.appendChild(button);
      const divider = document.createElement('br');
      list.appendChild(divider);
      pageElements.posts.appendChild(list);
    });
  }
};

export default render;
