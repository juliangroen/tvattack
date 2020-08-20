import StageComponent from '../lib/StageComponent';
import { fetchShow, searchShow } from '../lib/Requests';

class ShowCard extends StageComponent {
    constructor(state, selector) {
        super(state, selector);
        this.showKey = `${this.selector}-show`;
        this.resultsKey = `${this.selector}-results`;
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
        const searchResults = this.stateData[this.resultsKey];
        return /*html*/ `
            <form class="show-search-form">
            <input type="text" name="show-search" class="show-search"/>
            <button type="submit" class="show-search-button">Search Show</button>
            </form>
            ${(() => {
                let resultItems = ``;
                if (searchResults) {
                    for (const result of searchResults) {
                        resultItems += `<li class="search-results-item"> <a href="#" data-id="${result.show.id}" class="search-results-link"> ${result.show.name} </a></li>`;
                    }
                }

                return /*html*/ `
                    <ul class="search-results-list">
                        ${resultItems}
                    </ul>
                `;
            })()}   
        `;
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

    displayShow() {
        const show = this.stateData[this.showKey];
        const { name, type, image, genres, language, rating } = show;
        const network = show['network'] ? show['network'] : [];
        const embedded = show['_embedded'] ? show['_embedded'] : [];
        const episodes = embedded['episodes'] ? embedded['episodes'] : [];
        const images = embedded['images'] ? embedded['images'] : [];
        const imagesArray = [];
        for (const i of images) {
            if (i.resolutions.original) {
                if (i.resolutions.medium) {
                    imagesArray.push([i.resolutions.original.url, i.resolutions.medium.url]);
                } else {
                    imagesArray.push([i.resolutions.original.url]);
                }
            } else if (i.resolutions.medium) {
                imagesArray.push([i.resolutions.medium.url]);
            } else {
                imagesArray.push(['']);
            }
        }

        const networkName = network.name ? network.name : '';
        const networkCountry = network.country ? network.country.name : '';

        return /*html*/ `
            <div class="show-header">
                <div class="show-title">${name ? name : `N/A`}</div>
                <div class="show-network">${`${networkName ? networkName : ``} - ${networkCountry ? networkCountry : ``}`}</div>
            </div>
            <div class="show-poster-container">
                ${image ? `<img src="${image.original ? image.original : ``}" class="show-poster" />` : ``}
            </div>
            <div class="show-item-container">
                <div class="show-item-label">Type: </div>
                <div class="show-item">${type ? type : `N/A`}</div>
                <div class="show-item-label">Genres: </div>
                <ul class="show-genres-list">
                ${genres.map((genre) => /*html*/ `<li class="show-genres-list-item">${genre}</li>`).join('')}
                </ul>
                <div class="show-item-label">Average Rating: </div>
                ${rating ? /*html*/ `<div class="show-item">${rating.average ? `${rating.average} / 10` : `N/A`}</div>` : `N/A`}
                <div class="show-item-label">Language: </div>
                <div class="show-item">${language}</div>
                <div class="show-item-label">Episode Count: </div>
                <div class="show-item">${episodes.length}</div>
            </div>
            <div class="show-misc-image-container">
                ${imagesArray
                    .map(
                        (url) => /*html*/ `
                    <a href="${url[0]}"><img src="${url[1] ? url[1] : url[0]}" class="show-misc-image" /></a>
                `
                    )
                    .join('')}
            </div>
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
                    type: `Error: ID ${id} did not match a show. Please try searching for another show.`,
                };
                this.state.setState(errorShow);
                this.nextStage();
            });
    }

    getShowResults(string = '') {
        searchShow(string)
            .then((data) => {
                const showResults = {};
                showResults[this.resultsKey] = data;
                this.state.setState(showResults);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    bindEvents() {
        const elements = document.querySelector(`#${this.selector}`);
        const showSearchInput = elements.querySelector('.show-search');
        const showSearchButton = elements.querySelector('.show-search-button');
        const newShowButton = elements.querySelector('.new-search-button');
        const allSearchLinks = elements.querySelectorAll('.search-results-link');

        if (showSearchButton) {
            showSearchButton.addEventListener('click', (e) => {
                e.preventDefault();
                const query = showSearchInput.value.trim();
                this.getShowResults(query);
            });
        }

        if (newShowButton) {
            newShowButton.addEventListener('click', (e) => {
                e.preventDefault();
                const clearedResults = {};
                clearedResults[this.resultsKey] = '';
                this.state.setState(clearedResults);
                this.nextStage();
            });
        }

        for (const link of allSearchLinks) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const id = e.target.dataset.id;
                this.getShowData(id);
            });
        }
    }
}

export default ShowCard;
