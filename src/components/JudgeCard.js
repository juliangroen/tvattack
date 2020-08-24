import StageComponent from '../lib/StageComponent';

class JudgeCard extends StageComponent {
    constructor(state, selector, firstShow, secondShow) {
        super(state, selector);
        this.firstShow = firstShow;
        this.secondShow = secondShow;
    }

    update() {
        this.checkShowStages();
        super.update();
    }

    markup() {
        switch (this.stateData[this.stageId]) {
            case 0:
                return this.displayVersus();
                break;

            case 1:
                return this.displayLoader();
                break;

            case 2:
                return this.displayStats();
                break;

            default:
                break;
        }
    }

    checkShowStages() {
        const firstStageId = this.firstShow.stageId;
        const secondStageId = this.secondShow.stageId;

        const stateString = [this.stateData[firstStageId], this.stateData[secondStageId]].join('');
        if (stateString == '01' || stateString == '10') {
            if (this.stateData[this.stageId] == '0') {
                this.nextStage();
            }
        }
        if (stateString == '22') {
            if (this.stateData[this.stageId] == '1') {
                this.nextStage();
            }
        }
        if (stateString == '02' || stateString == '20') {
            if (this.stateData[this.stageId] == '2' || this.stateData[this.stageId] == '0') {
                this.nextStage();
            }
        }
    }

    displayVersus() {
        return /*html*/ `
            <h1>VS</h1>
        `;
    }

    displayStats() {
        const { firstItems, secondItems } = this.pullShowStats();
        return /*html*/ `
            <p>
                ${firstItems.map((item) => item)};
            </p>
            <p>
                ${secondItems.map((item) => item)};
            </p>
        `;
    }

    pullShowStats() {
        const firstItemContainer = document.querySelector('#first-card .show-item-container');
        const firstItems = [...firstItemContainer.querySelectorAll('.show-item')].map((item) => item.innerHTML);
        const secondItemContainer = document.querySelector('#second-card .show-item-container');
        const secondItems = [...secondItemContainer.querySelectorAll('.show-item')].map((item) => item.innerHTML);
        return { firstItems, secondItems };
    }
}

export default JudgeCard;
