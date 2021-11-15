
import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
import processRss from './src/processor.js'
import onChange from 'on-change'
import render from './src/view.js'
import addBootstrap from './src/bootstrap/addBootsrap.js'
import initApp from './src/init.js'
// import './App.css'

// let state = {
//     valid: null,
//     invalidFeedback: '',
//     validFeedback: '',
//     feeds: [],
//     posts: [],
//     showModal: false,
//     currentModalTitle: '',
//     currentModalBody: ''
// }

// export const watchedState = onChange(state, (path, value) => render(path, value));

export const watchedState = initApp();


const startApp = () => {

    let url;

    addBootstrap();

    const getComponent = () => {
        const element = document.createElement('div');

        element.innerHTML = `
    <div class='app'>
        <h1>RSS stream</h1>
        <form class="rss-input-form" novalidate>
            <div class="form-group">
                <input class="form-control" id="rssInput" required autofocus aria-label='url' placeholder="Enter url">
                <button type="submit" class="btn btn-primary" aria-label='add' name='add'>Add</button>
                <div class="invalid-feedback"></div>
                <div class="valid-feedback"></div>
            </div>
        </form>
        <h1>Feeds</h1>
        <div class='feeds'>
        </div>
        <h1>Posts</h1>
        <div class='posts'>
        </div>
        <div class="modal fade" id="previewModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
         </div>

    </div>`;

        return element;
    }

    const component = getComponent();

    document.body.appendChild(component);

    const form = document.getElementsByClassName('form-control')[0];
    const addButton = document.getElementsByClassName('btn-primary')[0];


    addButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        url = form.value;
        processRss(url, true);
    });

    if (state.posts.length > 0) {
        const viewButtons = document.getElementsByClassName('btn-view');
        [...viewButtons].map((button) => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                const id = event.value.id;
                const thisPost = watchedState.posts.find((post) => post.id === id);
                thisPost.viewed = true;
                console.log(state.posts);


            });
        })
    }
}

startApp();
export default startApp;







