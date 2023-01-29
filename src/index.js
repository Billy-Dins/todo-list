import './style.scss';

import { format, isThisWeek, parseISO, parse, getDate, getDay } from 'date-fns'

import { render, dueToday, dueThisWeek, displayObject } from './DOM/render.js'
import { removeContent } from './DOM/remove.js'

import { getItemValues } from './logic.js'


getItemValues('Laundry', "28-1-2023", 'Chillin')
getItemValues('Laundry', "29-1-2023", 'Chillin')
getItemValues('Dishes', "30-1-2023", 'Chillin')
getItemValues('Dishes', "31-1-2023", 'Not chillin')
getItemValues('Dishes', "1-2-2023", 'Not chillin')

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

const weekButton = document.getElementById('week-btn');
weekButton.addEventListener('click', () => {
    removeContent();
    const weekArray = dueThisWeek();
    displayObject(weekArray);
});