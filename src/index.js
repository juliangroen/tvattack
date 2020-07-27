import State from './lib/State';
import Counter from './components/Counter';
import ShowCard from './components/ShowCard';
import fetchShow from './lib/Requests';

const $state = new State();
//const TotalCounter = new Counter($state, "app");

//$state.addObserver(TotalCounter);
//TotalCounter.update();
//fetchShow("1121").then(data => {
//    const show = {show: data};
//    $state.setState(show);
//    })
//    .catch(e => {
//        console.log(e);
//    });
//
const firstCard = new ShowCard($state, "show-card");
$state.addObserver(firstCard);
firstCard.update();
