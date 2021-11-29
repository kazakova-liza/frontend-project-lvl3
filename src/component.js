export default () => {
    const element = document.createElement('div');

    element.innerHTML = `
        <div class='app'>
            <main class="flex-grow-1">
            <section class="container-fluid bg-dark p-5">
            <div class="row">
                <div class="col-md-10 col-lg-8 mx-auto text-white">
                <h1 class="display-3 mb-0">RSS aggregator</h1>
                <p class="lead">
                    Start reading RSS today! It's easy and simple.
                </p>
                <div class="row">
                    <div class="col">
                        <form class="rss-input-form" novalidate>
                            <div class="form-group">
                                <input class="form-control" id="rssInput" required autofocus aria-label='url' placeholder="Enter url">
                                <div class="invalid-feedback"></div>
                                <div class="valid-feedback"></div>
                            </div>
                        </form>
                    </div>
                    <div class="col-auto">
                        <button type="submit" class="btn btn-primary" aria-label='add' name='add'>Add</button>
                    </div>
                </div>
                <p class="mt-2 mb-0 text-muted">
                    Example: https://ru.hexlet.io/lessons.rss
                </p>
                <p class="feedback m-0 position-absolute small text-danger"></p>
                </div>
            </div>
            </section>
            <section class="container-fluid container-xxl p-5">
            <div class="row">
                <div
                class="col-md-10 col-lg-4 mx-auto order-0 order-lg-1 feeds"
                >
                </div>
                <div class="col-md-10 col-lg-8 order-1 mx-auto posts">
                </div>
            </div>
            </section>
        </main>
        <footer class="footer border-top py-3 mt-5 bg-light">
            <div class="container-xl">
                <div class="text-center">
                created by
                <a
                    href="https://github.com/kazakova-liza"
                    target="_blank"
                    >Liza Kazakova</a
                >
                </div>
            </div>
        </footer>
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