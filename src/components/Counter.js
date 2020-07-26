import Component from '../lib/Component';

class Counter extends Component {
    constructor(state, selector) {
        super(state, selector);
    }

    markup(state) {
        return `
            <span id="total">Total: ${state.totalValue}</span>
            <button id="incButton">Increase</button>
            <button id="decButton">Decrease</button>
        `;
    }

    attach() {
        this.appState.setState({totalValue: 0});
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
