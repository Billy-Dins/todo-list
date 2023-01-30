import './style.scss';

import { render, dueToday, dueThisWeek, displayTask } from './DOM/render.js'
import removeContent from './DOM/remove.js'
import { createNewProject, renderNavProjects } from './DOM/navProjects.js'

render();
renderNavProjects(); 

const homeButton = document.getElementById('home-btn');
homeButton.addEventListener('click', () => {
    removeContent();
    render();
});

const todayButton = document.getElementById('today-btn');
todayButton.addEventListener('click', () => {
    removeContent();
    const todayArray = dueToday();
    displayTask(todayArray);
});

const weekButton = document.getElementById('week-btn');
weekButton.addEventListener('click', () => {
    removeContent();
    const weekArray = dueThisWeek();
    displayTask(weekArray);
});
const addProject = document.getElementById('project-btn');
addProject.addEventListener('click', () => {
    createNewProject();
})