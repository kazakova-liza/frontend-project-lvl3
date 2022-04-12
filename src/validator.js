export default (data, schema, newFlag, watchedState) => {
    if (newFlag) {
        if (watchedState.feeds.find((feed) => feed.url === data) !== undefined) {
            watchedState.status = 'error';
            watchedState.feedback = 'duplicate';
            // throw ('error');
        }
    }
    if (watchedState.status !== 'error') {
        return schema.validate(data);
    }

}

