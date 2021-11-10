const addBootstrap = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = "src/bootstrap/css/bootstrap.min.css";
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
}

export default addBootstrap;