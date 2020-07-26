import Observer from '../lib/Observer';

class Component extends Observer {
    constructor(state, selector) {
        super()
        this.appState = state;
        this.selector = selector;
        this.attach();
    }

    markup(state) {
        return ``;
    }

    render(state, selector) {
        const markup = this.markup(state);
        const target = document.getElementById(selector);
        target.innerHTML = markup;
        this.bindEvents();
    }
    
    update() {
        this.render(this.appState.getState(), this.selector)
    }

    attach() {
        //this.update();
    }

    bindEvents() {
    }
}

export default Component;
