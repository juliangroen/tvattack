import Component from '../lib/Component';
import Requests from '../lib/Requests';

class ShowCard extends Component {

    markup(state) {
        //return `${state.testShow}`;
        return ``;
    }

    attach() {
        this.update();
    }

   // async getData() {
   //     const show = await Requests.fetchShow("1121");
   //     this.appState.setState({...this.appState, testShow: show});
   // }

}

export default ShowCard;
