import StageComponent from '../lib/StageComponent';
import fetchShow from '../lib/Requests';

class ShowCard extends StageComponent {
    constructor(state, selector) {
        super(state, selector);
        this.showKey = `${this.selector}-show`;
    }

    markup() {
        switch (this.stateData[this.stageId]) {
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
            <form>
            <input type="text" name="show-search" class="show-search"/>
            <button type="submit" class="show-search-button">Choose Show</button>
            </form>
        `;
    }

    displayLoader() {
        return `
        <svg width="44" height="44" stroke="#8844AA"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/><animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/><animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/></circle></g></svg>
        `;
    }

    displayShow() {
        const show = this.stateData[this.showKey];
        return `
            <span>${show.name}</span>
            <br />
            <button class="new-search-button">Search For New Show</button>
        `;
    }

    getShowData(id = -1) {
        // set stage to Loading
        this.nextStage();
        fetchShow(id)
            .then((data) => {
                const show = {};
                show[this.showKey] = data;
                this.state.setState(show);

                // set stage to Loaded
                this.nextStage();
            })
            .catch((e) => {
                console.log(e);
                const errorShow = {};
                errorShow[this.showKey] = {
                    name: `Error: ID ${id} did not match a show. Please try searching for another show.`,
                };
                this.state.setState(errorShow);
                //this.state.setState({
                //    showKey: {
                //        name: `Error: ID ${id} did not match a show. Please try searching for another show.`,
                //    },
                //});
                this.nextStage();
            });
    }

    bindEvents() {
        const elements = document.querySelector(`#${this.selector}`);
        //console.log(elements);
        const showSearchInput = elements.querySelector('.show-search');
        const showSearchButton = elements.querySelector('.show-search-button');
        const newShowButton = elements.querySelector('.new-search-button');

        if (showSearchButton) {
            showSearchButton.addEventListener('click', (e) => {
                const id = showSearchInput.value.trim();
                this.getShowData(id);
            });
        }

        if (newShowButton) {
            newShowButton.addEventListener('click', (e) => {
                this.nextStage();
            });
        }
    }
}

export default ShowCard;
