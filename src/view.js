import removeAllChildNodes from './utils/removeAllChildNodes.js';

const render = (path, value, i18nextInstance, elements, state) => {
  const pageElements = { ...elements };
  if (path === 'ui.status') {
    switch (value) {
      case 'input': {
        pageElements.input.readOnly = false;
        pageElements.addButton.disabled = false;
        pageElements.feedback.classList.remove('text-danger');
        break;
      }
      case 'valid': {
        pageElements.feedback.classList.remove('text-danger');
        pageElements.input.readOnly = false;
        pageElements.addButton.disabled = false;
        break;
      }
      case 'invalid': {
        pageElements.feedback.classList.add('text-danger');
        pageElements.input.readOnly = false;
        pageElements.addButton.disabled = false;
        break;
      }
      case 'loading': {
        pageElements.feedback.classList.remove('text-danger');
        pageElements.input.readOnly = true;
        pageElements.addButton.disabled = true;
        break;
      }
      case 'success': {
        pageElements.feedback.classList.remove('text-danger');
        pageElements.input.readOnly = false;
        pageElements.addButton.disabled = false;
        break;
      }
      case 'error': {
        pageElements.feedback.classList.add('text-danger');
        pageElements.input.readOnly = false;
        pageElements.addButton.disabled = false;
        break;
      }
      default:
        break;
    }
  }

  if (path === 'ui.feedback') {
    pageElements.feedback.textContent = '';
    pageElements.feedback.textContent = '';
    if (value === 'success') {
      pageElements.feedback.textContent = i18nextInstance.t('success');
    } else {
      pageElements.feedback.textContent = i18nextInstance.t(value);
    }
  }

  if (path === 'feeds') {
    removeAllChildNodes(pageElements.feeds);
    value.forEach((item) => {
      const feed = document.createElement('li');
      feed.classList.add('feed', 'list-group-item', 'border-0', 'border-end-0');
      const title = document.createElement('h3');
      title.classList.add('h6', 'm-0');
      title.textContent = item.title;
      const description = document.createElement('p');
      description.classList.add('m-0', 'small', 'text-black-50');
      description.textContent = item.description;
      feed.appendChild(title);
      feed.appendChild(description);
      pageElements.feeds.appendChild(feed);
    });
  }

  if (path === 'ui.viewedPosts') {
    value.forEach((id) => {
      const thisPost = document.getElementById(id);
      thisPost.classList.remove('fw-bold');
      thisPost.classList.add('fw-normal');
    });
  }

  if (path === 'ui.currentPostId') {
    const thisPost = state.posts.find((post) => post.id === value);
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    modalTitle.textContent = thisPost.title;
    modalBody.textContent = thisPost.description;
  }

  if (path === 'posts') {
    removeAllChildNodes(pageElements.posts);
    value.forEach((item) => {
      const list = document.createElement('li');
      list.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      const post = document.createElement('a');
      if (!state.ui.viewedPosts.has(item.id)) {
        post.classList.add('fw-bold');
      }
      post.href = item.link;
      post.textContent = item.title;
      post.id = item.id;
      post.dataset.description = item.description;

      const button = document.createElement('button');
      button.name = i18nextInstance.t('viewButton');
      button.textContent = i18nextInstance.t('viewButton');

      button.classList.add('btn', 'btn-outline-primary', 'btn-sm', 'mr-2');
      button.dataset.bsTarget = '#previewModal';
      button.dataset.bsToggle = 'modal';
      button.dataset.postId = item.id;
      list.appendChild(post);
      list.appendChild(button);
      pageElements.posts.appendChild(list);
    });
  }
};

export default render;
