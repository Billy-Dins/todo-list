import './style.css';
import './style.scss';

import { render, dueToday, displayObject } from './DOM/render.js'
import { removeContent } from './DOM/remove.js'

import { getItemValues } from './logic.js'

getItemValues('Laundry', '28-1-2023', 'Chillin')
getItemValues('Dishes', '30-1-2023', 'Chillin')
getItemValues('Dishes', '1-2-2023', 'Not chillin')

render();

const homeButton = document.getElementById('home-btn');
homeButton.addEventListener('click', () => {
    removeContent();
    render();
});

const todayButton = document.getElementById('today-btn');
todayButton.addEventListener('click', () => {
    removeContent();
    const todayArray = dueToday();
    displayObject(todayArray);
});