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
            <button type="submit" class="show-search-button">Search</button>
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
                const thumb = result.show.image ? `https:${result.show.image.medium.split(':')[1]}` : `${this.placeholderUrl(32, 48, '?')}`;
                const networkName = result.show.network ? result.show.network.name : result.show.webChannel ? result.show.webChannel.name : '';
                const date = result.show.premiered ? result.show.premiered : '';
                resultItems += /*html*/ `
                    <li class="search-results-item">
                        <a href="#" data-id="${showID}" class="search-results-link" >
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

    displayShow() {
        const show = this.stateData[this.showKey];
        const name = show['name'] ? show['name'] : '';
        const type = show['type'] ? show['type'] : '';
        const image = show['image'] ? show['image'] : [];
        const language = show['language'] ? show['language'] : '';
        const rating = show['rating'] ? show['rating'] : [];
        const genres = show['genres'] ? show['genres'] : [];
        const premiered = show['premiered'] ? show['premiered'] : '';
        const year = premiered.substring(0, 4);

        const network = show['network'] ? show['network'] : [];
        const webChannel = show['webChannel'] ? show['webChannel'] : [];
        const networkName = network.name ? network.name : webChannel.name ? webChannel.name : '';
        const networkCountry = network.country ? network.country.name : webChannel.country ? webChannel.country.name : '';

        const embedded = show['_embedded'] ? show['_embedded'] : [];
        const episodes = embedded['episodes'] ? embedded['episodes'] : [];

        const poster = image.original ? `https:${image.original.split(':')[1]}` : null;
        const images = embedded['images'] ? embedded['images'] : [];
        const imagesArray = [];
        for (const i of images) {
            if (i.resolutions.original) {
                if (i.resolutions.medium) {
                    imagesArray.push([`https:${i.resolutions.original.url.split(':')[1]}`, `https:${i.resolutions.medium.url.split(':')[1]}`]);
                } else {
                    imagesArray.push([`https:${i.resolutions.original.url.split(':')[1]}`]);
                }
            } else if (i.resolutions.medium) {
                imagesArray.push([`https:${i.resolutions.medium.url.split(':')[1]}`]);
            } else {
                imagesArray.push(['']);
            }
        }

        return /*html*/ `
            <div class="show-header">
                <div class="show-title">${name ? name : `N/A`}</div>
                <div class="show-network">${`${networkName ? networkName : ``} - ${networkCountry ? networkCountry : ``}`}</div>
                <div class="toggle-icon" data-tooltip="toggle additional information">+</div>
            </div>
            <div class="show-poster-container hidden">
                <img src="${poster ? poster : `${this.placeholderUrl(256, 384, 'No Poster Available')}`}" class="show-poster" />
            </div>
            <div class="show-item-container hidden">
                <div class="show-item-label">Year: </div>
                <div class="show-item">${year ? year : `N/A`}</div>
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
            <div class="show-misc-image-container hidden">
                ${imagesArray
                    .map(
                        (url) => /*html*/ `
                    <a href="${url[0]}" target="_blank"><img src="${url[1] ? url[1] : url[0]}" class="show-misc-image" /></a>
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
        const toggleIcon = elements.querySelector('.toggle-icon');
        const allDivs = elements.querySelectorAll(':scope > div');

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

        if (toggleIcon) {
            toggleIcon.addEventListener('click', (e) => {
                e.preventDefault();
                if (toggleIcon.innerHTML === '+') {
                    toggleIcon.innerHTML = '-';
                } else {
                    toggleIcon.innerHTML = '+';
                }
                Array.from(allDivs).map((div) => {
                    if (!div.classList.contains('show-header')) {
                        div.classList.toggle('hidden');
                    }
                });
            });
        }
    }
}

export default ShowCard;
