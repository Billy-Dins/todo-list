import { isThisWeek, parse, } from 'date-fns'

import { projectsList } from './nav_render.js'
import { groupBy, todoItems } from '../logic/logic.js'
import removeContent from './main_remove.js';

// This function should create a task and push it to local storage.
// A different function should render localStorage to the webpage.
const displayProject = function(project, index) {
    const mainContent = document.querySelector('.main')
    const projectTitle = document.createElement('div');
    projectTitle.textContent = `${project.title}`;
    const taskContainer = document.createElement('div');
    taskContainer.id = 'task-container';
    const addTask = document.createElement('button');
    addTask.id = 'add-task-btn'
    addTask.textContent = '+ Add task'
    addTask.addEventListener('click', () => {
        projectsList[index].taskList.push('hello')
        projectsList[index].taskList.push('hello')
        projectsList[index].taskList.push('hello')
        console.log(projectsList[index].taskList);
    })
    removeContent();
    mainContent.appendChild(projectTitle);
    mainContent.appendChild(taskContainer);
    mainContent.appendChild(addTask);
};
// checks if there is a displayed key 
const render = function(key, value) {
    if (key && value) {
        const groupedProjects = groupBy(key)[value];
        displayProject(groupedProjects)
    } else {
        const groupedProjects = JSON.parse(localStorage.getItem("to do items"))
        displayProject(groupedProjects)
    }
};
const todaysDate = function() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let year = date.getFullYear();
    return `${year}-${month}-${day}`
};

const dueToday = function() {
    return todoItems.filter(item => item.dueDate === todaysDate());
};

const dueThisWeek = function() {
    let dueWeekArray = []
    for (let i = 0; i < todoItems.length; i++) {
        let newDate = todoItems[i].dueDate;
        if (isThisWeek(parse(newDate, 'yyyy-mm-dd', new Date()))) {
            dueWeekArray.push(todoItems[i]);
        }
    }
    return dueWeekArray;
};
export { render, dueToday, dueThisWeek, displayProject }
