export default () => {
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

    document.body.appendChild(element);
}