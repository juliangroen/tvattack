import State from './lib/State';
import ShowCard from './components/ShowCard';

const $state = new State();

const firstCard = new ShowCard($state, 'first-card');
$state.addObserver(firstCard);
firstCard.update();
const secondCard = new ShowCard($state, 'second-card');
$state.addObserver(secondCard);
secondCard.update();
