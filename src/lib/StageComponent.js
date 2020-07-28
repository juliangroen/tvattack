import Component from './Component';

class StageComponent extends Component {
    constructor(state, selector) {
        super(state, selector);
        this.stageId = `s${Math.random().toString().slice(2, 10)}`;
        const stageObj = {};
        stageObj[this.stageId] = 0;
        this.state.setState(stageObj);
    }

    nextStage() {
        // Stages
        // 0 = unloaded
        // 1 = loading
        // 2 = loaded
        const obj = {};
        switch (this.stateData[this.stageId]) {
            // unloaded -> loading
            case 0:
                obj[this.stageId] = 1;
                this.state.setState(obj);
                break;
            // loading -> loaded
            case 1:
                obj[this.stageId] = 2;
                this.state.setState(obj);
                break;
            // loaded -> unloaded
            case 2:
                obj[this.stageId] = 0;
                this.state.setState(obj);
                break;
            default:
                break;
        }
    }
}

export default StageComponent;
