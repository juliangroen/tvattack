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
        const { firstSet, secondSet } = this.compareStats(firstItems, secondItems);
        const firstSetElements = [];
        const secondSetElements = [];
        firstSet.map((item) => {
            if (Array.isArray(item)) {
                const html = /*html*/ `<div class="${item[1]}">${item[0]}</div>`;
                firstSetElements.push(html);
            } else {
                const html = /*html*/ `<div>${item}</div>`;
                firstSetElements.push(html);
            }
        });

        secondSet.map((item) => {
            if (Array.isArray(item)) {
                const html = /*html*/ `<div class="${item[1]}">${item[0]}</div>`;
                secondSetElements.push(html);
            } else {
                const html = /*html*/ `<div>${item}</div>`;
                secondSetElements.push(html);
            }
        });

        return /*html*/ `
            <div class="compare-container">
                <div class="versus">VS</div>
                <div class="compare-items">
                    ${firstSetElements.map((el) => el).join('')}
                </div>
                <div class="compare-items">
                    ${secondSetElements.map((el) => el).join('')}
                </div>
            </div>
        `;

        //${firstSet.map((item) => /*html*/ `<div>${item}</div>`).join('')}
        //${secondSet.map((item) => /*html*/ `<div>${item}</div>`).join('')}
    }

    pullShowStats() {
        const firstItemContainer = document.querySelector('#first-card .show-item-container');
        const firstItems = [...firstItemContainer.querySelectorAll('.show-item')].map((item) => item.innerHTML);
        const secondItemContainer = document.querySelector('#second-card .show-item-container');
        const secondItems = [...secondItemContainer.querySelectorAll('.show-item')].map((item) => item.innerHTML);
        return { firstItems, secondItems };
    }

    compareStats(firstArray, secondArray) {
        const firstSet = [...firstArray];
        const secondSet = [...secondArray];

        // compare date
        if (parseInt(firstSet[0]) > parseInt(secondSet[0])) {
            firstSet[0] = [firstSet[0], 'green'];
            secondSet[0] = [secondSet[0], 'red'];
            //firstSet.splice(0, 0, [firstSet[0], 'green']);
            //secondSet.splice(0, 0, [secondSet[0], 'red']);
        } else {
            firstSet[0] = [firstSet[0], 'red'];
            secondSet[0] = [secondSet[0], 'green'];
            //firstSet.splice(0, 0, [firstSet[0], 'red']);
            //secondSet.splice(0, 0, [secondSet[0], 'green']);
        }

        // compare rating
        if (parseFloat(firstSet[2].split(' ')[0]) > parseFloat(secondSet[2].split(' ')[0])) {
            firstSet[2] = [firstSet[2], 'green'];
            secondSet[2] = [secondSet[2], 'red'];
            //firstSet.splice(2, 2, [firstSet[2], 'green']);
            //secondSet.splice(2, 2, [secondSet[2], 'red']);
        } else {
            firstSet[2] = [firstSet[2], 'red'];
            secondSet[2] = [secondSet[2], 'green'];
            //firstSet.splice(2, 2, [firstSet[2], 'red']);
            //secondSet.splice(2, 2, [secondSet[2], 'green']);
        }

        // compare episode count
        if (parseInt(firstSet[4]) > parseInt(secondSet[4])) {
            firstSet[4] = [firstSet[4], 'green'];
            secondSet[4] = [secondSet[4], 'red'];
            //firstSet.splice(4, 4, [firstSet[4], 'green']);
            //secondSet.splice(4, 4, [secondSet[4], 'red']);
        } else {
            firstSet[4] = [firstSet[4], 'red'];
            secondSet[4] = [secondSet[4], 'green'];
            //firstSet.splice(4, 4, [firstSet[4], 'red']);
            //secondSet.splice(4, 4, [secondSet[4], 'green']);
        }
        // return modified arrays
        return { firstSet, secondSet };
    }
}

export default JudgeCard;
