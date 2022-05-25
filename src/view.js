import removeAllChildNodes from './utils/removeAllChildNodes.js';

const render = (path, value, i18nextInstance, elements) => {
  // console.log(path);
  const pageElements = { ...elements };
  if (path === 'ui.status') {
    // pageElements.invalidFeedback.textContent = '';
    // pageElements.validFeedback.textContent = '';
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
        // pageElements.validFeedback.textContent = i18nextInstance.t('success');
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

  if (path === 'ui.feedback') {
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

  if (path === 'ui.viewedPosts') {
    value.forEach((id) => {
      const thisPost = document.getElementById(id);
      thisPost.classList.remove('fw-bold');
      thisPost.classList.add('fw-normal');
    });
  }

  if (path === 'posts') {
    removeAllChildNodes(pageElements.posts);
    value.forEach((item) => {
      const list = document.createElement('li');
      list.classList.add('d-flex', 'justify-content-between', 'align-items-start');
      const post = document.createElement('a');
      post.classList.add('fw-bold');
      post.href = item.link;
      post.textContent = item.title;
      post.id = item.id;

      const button = document.createElement('button');
      button.name = i18nextInstance.t('viewButton');
      button.textContent = i18nextInstance.t('viewButton');
      button.classList.add('btn', 'btn-primary', 'btn-view');
      button.dataset.bsTarget = '#previewModal';
      button.dataset.bsToggle = 'modal';
      button.dataset.postId = item.id;
      button.classList.add('btn-secondary');
      const modalTitle = document.getElementById('modal-title');
      const modalBody = document.getElementById('modal-body');
      button.onclick = () => {
        modalTitle.textContent = item.title;
        modalBody.textContent = item.description;
        post.classList.remove('fw-bold');
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
