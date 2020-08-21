import State from './lib/State';
import ShowCard from './components/ShowCard';
import JudgeCard from './components/JudgeCard';

const $state = new State();

const firstCard = new ShowCard($state, 'first-card');
$state.addObserver(firstCard);
firstCard.update();
const secondCard = new ShowCard($state, 'second-card');
$state.addObserver(secondCard);
secondCard.update();
const judgeCard = new JudgeCard($state, 'judge-card', firstCard, secondCard);
$state.addObserver(judgeCard);
judgeCard.update();

const firstCardInput = document.querySelector('#first-card .show-search');
const firstCardButton = document.querySelector('#first-card .show-search-button');
const secondCardInput = document.querySelector('#second-card .show-search');
const secondCardButton = document.querySelector('#second-card .show-search-button');
