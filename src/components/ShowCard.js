import StageComponent from '../lib/StageComponent';
import fetchShow from '../lib/Requests';

class ShowCard extends StageComponent {

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
            <input type="text" name="show-search" id="show-search"/>
            <button type="submit" id="show-search-button">Choose Show</button>
            </form>
        `;
    }

    displayLoader() {
        return `
        <svg width="44" height="44" stroke="#8844AA"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/><animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/><animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/></circle></g></svg>
        `;
    }

    displayShow() {
        const show = this.stateData.show;
        return `
            <span>${show.name}</span>
            <br />
            <button id="new-search-button">Search For New Show</button>
        `;
    }

    getShowData(id = -1) {
        // set stage to Loading
        this.nextStage();
        fetchShow(id)
            .then((data) => {
                const show = { show: data };
                this.state.setState(show);

                // set stage to Loaded
                this.nextStage();
            })
            .catch((e) => {
                console.log(e);
                this.state.setState({
                    show: {
                        name: `Error: ID ${id} did not match a show. Please try searching for another show.`,
                    },
                });
                this.nextStage();
            });
    }

    bindEvents() {
        if (document.querySelector('#show-search-button')) {
            const showSearchButton = document.querySelector(
                '#show-search-button'
            );
            showSearchButton.addEventListener('click', (e) => {
                const showSearchInput = document.querySelector('#show-search');
                const id = showSearchInput.value.trim();
                this.getShowData(id);
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
