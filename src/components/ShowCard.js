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
            ${this.displaySearchResults(searchResults)}
        `;
    }

    displaySearchResults(searchResults) {
        let resultItems = ``;
        if (searchResults) {
            for (const result of searchResults) {
                const showID = result.show.id ? result.show.id : '';
                const name = result.show.name ? result.show.name : '';
                const thumb = result.show.image ? result.show.image.medium : `${this.placeholderUrl(32, 48, '?')}`;
                const networkName = result.show.network ? result.show.network.name : result.show.webChannel ? result.show.webChannel.name : '';
                const date = result.show.premiered ? result.show.premiered : '';
                resultItems += /*html*/ `
                    <li class="search-results-item">
                        <a href="#" data-id="${showID}" class="search-results-link">
                            <img src="${thumb}" alt="" class="search-results-thumb"/>
                            <div>${name} (${date !== '' ? date.substring(0, 4) : 'N/A'}, ${networkName})</div>
                        </a>
                    </li>
                `;
            }
        }

        return /*html*/ `
            <ul class="search-results-list">
                ${resultItems}
            </ul>
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
        const name = show['name'] ? show['name'] : [];
        const type = show['type'] ? show['type'] : [];
        const image = show['image'];
        const language = show['language'] ? show['language'] : [];
        const rating = show['rating'] ? show['rating'] : [];
        const genres = show['genres'] ? show['genres'] : [];
        const network = show['network'] ? show['network'] : [];
        const webChannel = show['webChannel'] ? show['webChannel'] : [];
        const networkName = network.name ? network.name : webChannel.name ? webChannel.name : '';
        const networkCountry = network.country ? network.country.name : webChannel.country ? webChannel.country.name : '';
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

        return /*html*/ `
            <div class="show-header">
                <div class="show-title">${name ? name : `N/A`}</div>
                <div class="show-network">${`${networkName ? networkName : ``} - ${networkCountry ? networkCountry : ``}`}</div>
            </div>
            <div class="show-poster-container">
                <img src="${image ? image.original : `${this.placeholderUrl(256, 384, 'No Poster Available')}`}" class="show-poster" />
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

    placeholderUrl(width, height = '', text = '') {
        const bgColor = '666666';
        const textColor = '262626';
        if (height !== '') {
            if (text !== '') {
                return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${text.trim()}`;
            } else {
                return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}`;
            }
        } else {
            if (text !== '') {
                return `https://via.placeholder.com/${width}/${bgColor}/${textColor}?text=${text.trim()}`;
            } else {
                return `https://via.placeholder.com/${width}/${bgColor}/${textColor}`;
            }
        }
    }

    getShowData(id) {
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

    getShowResults(string) {
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
                const anchor = e.target.closest('.search-results-link');
                const id = anchor.dataset.id;
                this.getShowData(id);
            });
        }
    }
}

export default ShowCard;
