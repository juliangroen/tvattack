import Observer from '../lib/Observer';

class Counter extends Observer {
    constructor(state, selector) {
        super();

        this.appState = state;
        this.selector = selector;

    }

    markup(state) {
        return `
            <span id="total">Total: ${state.totalValue}</span>
            <button id="incButton">Increase</button>
            <button id="decButton">Decrease</button>
        `;
    }

    render(state, selector) {
        const markup = this.markup(state);
        const target = document.getElementById(selector);
        target.innerHTML = markup;
        this.bindEvents();
    }

    update() {
        this.render(this.appState.getState(), this.selector);
    }

    attach() {
        this.appState.setState({...this.appState, totalValue: 0});
        this.update();
    }

    bindEvents() {
        const incButton = document.querySelector("#incButton");
        incButton.addEventListener('click', e => {
            this.increaseValue();   
        });

        const decButton = document.querySelector("#decButton");
        decButton.addEventListener('click', e => {
            this.decreaseValue();
        });
    }

    increaseValue() {
        const state = this.appState.getState();
        state.totalValue++
        this.appState.setState(state)
    }

    decreaseValue() {
        const state = this.appState.getState();
        state.totalValue--
        this.appState.setState(state)
    }
}

export default Counter;
