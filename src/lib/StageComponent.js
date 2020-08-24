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

    displayLoader() {
        return /*html*/ `
        <div class="svg-loader">
            <svg width="44" height="44" stroke="#8844AA">
                <g fill="none" fill-rule="evenodd" stroke-width="2">
                    <circle cx="22" cy="22" r="1">
                        <animate
                            attributeName="r"
                            begin="0s"
                            dur="1.8s"
                            values="1; 20"
                            calcMode="spline"
                            keyTimes="0; 1"
                            keySplines="0.165, 0.84, 0.44, 1"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="stroke-opacity"
                            begin="0s"
                            dur="1.8s"
                            values="1; 0"
                            calcMode="spline"
                            keyTimes="0; 1"
                            keySplines="0.3, 0.61, 0.355, 1"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle cx="22" cy="22" r="1">
                        <animate
                            attributeName="r"
                            begin="-0.9s"
                            dur="1.8s"
                            values="1; 20"
                            calcMode="spline"
                            keyTimes="0; 1"
                            keySplines="0.165, 0.84, 0.44, 1"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="stroke-opacity"
                            begin="-0.9s"
                            dur="1.8s"
                            values="1; 0"
                            calcMode="spline"
                            keyTimes="0; 1"
                            keySplines="0.3, 0.61, 0.355, 1"
                            repeatCount="indefinite"
                        />
                    </circle>
                </g>
            </svg>
        </div>
        `;
    }
}

export default StageComponent;
