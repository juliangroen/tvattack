import Observer from './Observer';

class Component extends Observer {
    constructor(state, selector) {
        super();
        this.state = state;
        this.stateData = state.getState();
        this.selector = selector;
        this.init();
    }

    init() {}

    markup() {
        return ``;
    }

    render() {
        const markup = this.markup();
        const target = document.getElementById(this.selector);
        target.innerHTML = markup;
        this.bindEvents();
    }

    update() {
        this.render();
    }

    bindEvents() {}
}

export default Component;
