import StageComponent from '../lib/StageComponent';

class JudgeCard extends StageComponent {
    constructor(state, selector, firstShow, secondShow) {
        super(state, selector);
    }

    markup() {
        return /*html*/ `
            <h1>VS</h1>
        `;
    }
}

export default JudgeCard;
