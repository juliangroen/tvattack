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

firstCardInput.value = 'bebop';
firstCardButton.click();
secondCardInput.value = 'er';
secondCardButton.click();

const firstClick = () => {
    const id = setInterval(() => {
        if (document.querySelectorAll('#first-card .search-results-link')[0]) {
            document.querySelectorAll('#first-card .search-results-link')[0].click();
            secondClick();
            clearInterval(id);
        } else {
            firstClick();
            clearInterval(id);
        }
    }, 1000);
};

const secondClick = () => {
    const id = setInterval(() => {
        if (document.querySelectorAll('#second-card .search-results-link')[0]) {
            document.querySelectorAll('#second-card .search-results-link')[0].click();
            clearInterval(id);
        } else {
            secondClick();
            clearInterval(id);
        }
    }, 1000);
};

//firstClick();
