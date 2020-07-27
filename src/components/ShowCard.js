import Component from '../lib/Component';

class ShowCard extends Component {

    markup() {
        this.displaySearch();
    }

    displaySearch() {
        html = `
            <div id='test'>test</div>
        `;
    }

}

export default ShowCard;
