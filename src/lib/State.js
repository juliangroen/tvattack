import Subject from './Subject';

class State extends Subject {
    constructor() {
        super();
        this.state = {};
    }

    getState() {
        return this.state;
    }

    setState(data = {}) {
        this.state = Object.assign(this.state, data)
        this.notify(this.state);
    }
}

export default State;
