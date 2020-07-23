class Subject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        const obsIndex = this.observers.indexOf(observer);
        if (obsIndex >= 0) {
            this.observers = this.observers.splice(obsIndex, 1);
        }
    }

    notify(data) {
        this.observers.forEach(obs => {
            obs.update(data);
        })
    }
}

export default Subject;
