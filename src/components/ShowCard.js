import Component from '../lib/Component';

class ShowCard extends Component {
    init() {
        this.stateData = this.state.getState();
        this.state.setState({ showCardStage: 0 });
    }
    markup() {
        switch (this.stateData.showCardStage) {
            case 0:
                return this.displaySearch();
                break;

            case 1:
                return this.displayLoader();
                break;

            case 2:
                return this.displayShow();
                break;

            default:
                break;
        }
    }

    displaySearch() {
        return `
            <input type="text" name="show-search" id="show-search"/>
            <button id="show-search-button">Choose Show</button>
        `;
    }

    displayLoader() {
        return `
        <svg width="44" height="44" stroke="#8844AA"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/><animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/><animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/></circle></g></svg>
        `;
    }

    displayShow() {
        return `<button id="new-search-button">Search For New Show</button>`;
    }

    nextStage() {
        switch (this.stateData.showCardStage) {
            // unloaded -> loading
            case 0:
                this.state.setState({ showCardStage: 1 });
                console.log('change stage 0 to 1');
                break;
            // loading -> loaded
            case 1:
                this.state.setState({ showCardStage: 2 });
                console.log('change stage 1 to 2');
                break;
            // loaded -> unloaded
            case 2:
                this.state.setState({ showCardStage: 0 });
                console.log('change stage 2 to 0');
                break;
            default:
                break;
        }
    }

    bindEvents() {
        if (document.querySelector('#show-search-button')) {
            const showSearchButton = document.querySelector(
                '#show-search-button'
            );
            showSearchButton.addEventListener('click', (e) => {
                this.nextStage();
                setTimeout(() => {
                    this.nextStage();
                }, 3000);
            });
        }

        if (document.querySelector('#new-search-button')) {
            const newSearchButton = document.querySelector(
                '#new-search-button'
            );
            newSearchButton.addEventListener('click', (e) => {
                this.nextStage();
            });
        }
    }
}

export default ShowCard;
