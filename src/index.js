import State from './lib/State';
import Counter from './components/Counter';
import ShowCard from './components/ShowCard';

const $state = new State();
const TotalCounter = new Counter($state, "app");
const firstCard = new ShowCard($state, "show-card");

$state.addObserver(TotalCounter);
$state.addObserver(firstCard);
TotalCounter.update();
firstCard.update();
