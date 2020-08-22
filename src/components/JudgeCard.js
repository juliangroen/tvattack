import StageComponent from '../lib/StageComponent';

class JudgeCard extends StageComponent {
    constructor(state, selector, firstShow, secondShow) {
        super(state, selector);
        this.firstShow = firstShow;
        this.secondShow = secondShow;
    }

    markup() {
        console.log(this.firstShow);
        return /*html*/ `
            <h1>VS</h1>
        `;
    }
}

export default JudgeCard;
