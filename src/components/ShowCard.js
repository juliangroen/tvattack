import Component from '../lib/Component';
import fetchShow from '../lib/Requests';

class ShowCard extends Component {

    markup(state) {
        let show = state.show;
        let name = show.name;
        return `${name}`;
    }

    attach() {
        fetchShow("1121").then(data => {
            const show = {show: data};
            this.appState.setState(show);
        }).catch(e => {
            console.log(e);
        })
    }

}

export default ShowCard;
