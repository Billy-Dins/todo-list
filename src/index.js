import './style.scss';

import { dueToday, dueThisWeek, renderDueDate, renderHome } from './DOM/main_render.js'
import { removeContent } from './DOM/main_remove.js'
import { createNewProjectButton, renderNavProjects, } from './DOM/nav_render.js'

createNewProjectButton();
renderNavProjects(); 
renderHome();

const homeButton = document.getElementById('home-btn');
homeButton.addEventListener('click', () => {
    removeContent();
    renderHome();
});

const todayButton = document.getElementById('today-btn');
todayButton.addEventListener('click', () => {
    removeContent();
    const todayArray = dueToday();
    renderDueDate(todayArray, 'today');
});

const weekButton = document.getElementById('week-btn');
weekButton.addEventListener('click', () => {
    removeContent();
    const weekArray = dueThisWeek();
    renderDueDate(weekArray, 'this week');
});