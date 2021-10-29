import Items from './Components/Items.js';

class App {
    constructor() {
        const $app = document.querySelector('#app');
        new Items($app);
    }
}

new App();

console.log('hi~');
