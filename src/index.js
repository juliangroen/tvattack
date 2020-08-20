import State from './lib/State';
import ShowCard from './components/ShowCard';

const $state = new State();

const firstCard = new ShowCard($state, 'first-card');
$state.addObserver(firstCard);
firstCard.update();
const secondCard = new ShowCard($state, 'second-card');
$state.addObserver(secondCard);
secondCard.update();

const firstCardInput = document.querySelector('#first-card .show-search');
const firstCardButton = document.querySelector('#first-card .show-search-button');
const secondCardInput = document.querySelector('#second-card .show-search');
const secondCardButton = document.querySelector('#second-card .show-search-button');
