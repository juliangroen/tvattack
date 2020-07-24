import State from './lib/State';
import Counter from './components/Counter';

const $state = new State();
const TotalCounter = new Counter($state, "app");

$state.addObserver(TotalCounter);
TotalCounter.attach();
