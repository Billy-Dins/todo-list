import './style.scss';

import { render, dueToday, dueThisWeek, displayProject } from './DOM/main_render.js'
import removeContent from './DOM/main_remove.js'
import { createNewProject, renderNavProjects } from './DOM/nav_render.js'

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
    displayProject(todayArray);
});

const weekButton = document.getElementById('week-btn');
weekButton.addEventListener('click', () => {
    removeContent();
    const weekArray = dueThisWeek();
    displayProject(weekArray);
});
const addProject = document.getElementById('project-btn');
addProject.addEventListener('click', () => {
    createNewProject();
})