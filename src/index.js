import State from './lib/State';
import Counter from './components/Counter';
import ShowCard from './components/ShowCard';
import fetchShow from './lib/Requests';

const $state = new State();

const firstCard = new ShowCard($state, 'show-card');

$state.addObserver(firstCard);

firstCard.update();
