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
        const labelNames = ['Year', 'Type', 'Average Rating', 'Language', 'Episode Count'];
        const winner = this.chooseWinner(firstSet, secondSet);

        firstSet.map((item, index) => {
            if (Array.isArray(item)) {
                const html = /*html*/ `
                    <div class="compare-item-content">
                        <div class="label">${labelNames[index]}</div>
                        <div class="${item[1]}">${item[0]}</div>
                    </div>
                `;
                firstSetElements.push(html);
            } else {
                const html = /*html*/ `
                    <div class="compare-item-content">
                        <div class="label">${labelNames[index]}</div>
                        <div>${item}</div>
                    </div>
                `;
                firstSetElements.push(html);
            }
        });

        secondSet.map((item, index) => {
            if (Array.isArray(item)) {
                const html = /*html*/ `
                    <div class="compare-item-content">
                        <div class="label">${labelNames[index]}</div>
                        <div class="${item[1]}">${item[0]}</div>
                    </div>
                `;
                secondSetElements.push(html);
            } else {
                const html = /*html*/ `
                    <div class="compare-item-content">
                        <div class="label">${labelNames[index]}</div>
                        <div>${item}</div>
                    </div>
                `;
                secondSetElements.push(html);
            }
        });

        return /*html*/ `
            <div class="toggle-icon" data-tooltip="toggle additional information">+</div>
            <div class="compare-container">
                <div class="compare-items hidden">
                    ${firstSetElements.map((el) => el).join('')}
                </div>
                <div class="versus hidden">VS</div>
                <div class="compare-items hidden">
                    ${secondSetElements.map((el) => el).join('')}
                </div>
            </div>
            <div class="winner-container">
                <div class="label">${winner !== 'tie' ? 'Winner!' : ''}</div>
                <div class="show ${winner !== 'tie' ? 'green' : 'red'}">${winner !== 'tie' ? winner : 'No Contest!'}</div>
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
        if (parseInt(firstSet[0]) > parseInt(secondSet[0]) || (firstSet[0] !== 'N/A' && secondSet[0] === 'N/A')) {
            firstSet[0] = [firstSet[0], 'green'];
            secondSet[0] = [secondSet[0], 'red'];
        } else if (parseInt(firstSet[0]) < parseInt(secondSet[0]) || (firstSet[0] === 'N/A' && secondSet[0] !== 'N/A')) {
            firstSet[0] = [firstSet[0], 'red'];
            secondSet[0] = [secondSet[0], 'green'];
        }

        // compare rating
        if (parseFloat(firstSet[2].split(' ')[0]) > parseFloat(secondSet[2].split(' ')[0]) || (firstSet[2] !== 'N/A' && secondSet[2] === 'N/A')) {
            firstSet[2] = [firstSet[2], 'green'];
            secondSet[2] = [secondSet[2], 'red'];
        } else if (parseFloat(firstSet[2].split(' ')[0]) < parseFloat(secondSet[2].split(' ')[0]) || (firstSet[2] === 'N/A' && secondSet[2] !== 'N/A')) {
            firstSet[2] = [firstSet[2], 'red'];
            secondSet[2] = [secondSet[2], 'green'];
        }

        // compare episode count
        if (parseInt(firstSet[4]) > parseInt(secondSet[4]) || (firstSet[4] !== 'N/A' && secondSet[4] === 'N/A')) {
            firstSet[4] = [firstSet[4], 'green'];
            secondSet[4] = [secondSet[4], 'red'];
        } else if (parseInt(firstSet[4]) < parseInt(secondSet[4]) || (firstSet[4] === 'N/A' && secondSet[4] !== 'N/A')) {
            firstSet[4] = [firstSet[4], 'red'];
            secondSet[4] = [secondSet[4], 'green'];
        }
        // return modified arrays
        return { firstSet, secondSet };
    }

    chooseWinner(firstSet, secondSet) {
        const showTotals = [];
        const firstShowName = document.querySelector('#first-card .show-title').innerHTML;
        const secondShowName = document.querySelector('#second-card .show-title').innerHTML;
        let firstShowCount = 0;
        let secondShowCount = 0;

        // tally wins for first show
        firstSet.map((item) => {
            if (Array.isArray(item)) {
                if (item.includes('green')) {
                    firstShowCount++;
                }
            }
        });

        // tally wins for second show
        secondSet.map((item) => {
            if (Array.isArray(item)) {
                if (item.includes('green')) {
                    secondShowCount++;
                }
            }
        });

        // add data to showTotals
        showTotals.push(firstShowName);
        showTotals.push(firstShowCount);
        showTotals.push(secondShowName);
        showTotals.push(secondShowCount);

        if (showTotals[1] > showTotals[3]) {
            return showTotals[0];
        } else if (showTotals[1] < showTotals[3]) {
            return showTotals[2];
        } else if (showTotals[1] === showTotals[3]) {
            return 'tie';
        }
    }

    bindEvents() {
        const elements = document.querySelector(`#${this.selector}`);
        const toggleIcon = elements.querySelector('.toggle-icon');
        const itemContainers = elements.querySelectorAll('.compare-items');
        const versus = elements.querySelector('.versus');

        if (toggleIcon) {
            toggleIcon.addEventListener('click', (e) => {
                e.preventDefault();
                if (toggleIcon.innerHTML === '+') {
                    toggleIcon.innerHTML = '-';
                } else {
                    toggleIcon.innerHTML = '+';
                }
                Array.from(itemContainers).map((div) => {
                    div.classList.toggle('hidden');
                });
                versus.classList.toggle('hidden');
            });
        }
    }
}

export default JudgeCard;
