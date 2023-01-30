import { isThisWeek, parse, } from 'date-fns'

import { groupBy, todoItems } from '../logic.js'
import { navProjects } from './navProjects.js';
import removeContent from './remove.js';

// render selected project & its todos onto webpage
const displayTask = function(groupedProjects) {
    const mainContent = document.querySelector('.main')
    if (JSON.parse(localStorage.getItem('to do items'))) {
        for (let i = 0; i < groupedProjects.length; i++) {
            const projectValue = document.createElement('div');
            projectValue.classList.add('todo-item')
            projectValue.id = `todo-item-${i}`
            const projectTitle = document.createElement('div');
            projectTitle.textContent = `${groupedProjects[i].title}`
            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-task-btn');
            removeButton.textContent = 'X'
            removeButton.addEventListener('click', (e) => {
                const index = '';
                const itemArray = JSON.parse(localStorage.getItem('to do items'));
                itemArray.splice(index, 1);
                localStorage.setItem('to do items', JSON.stringify(itemArray));
                removeContent();
                render();
            });
            const projectDescription = document.createElement('div');
            projectDescription.textContent = `${groupedProjects[i].description}`
            const projectDueDate = document.createElement('div');
            projectDueDate.textContent = `Project is due: ${groupedProjects[i].dueDate}`
            projectValue.append(projectTitle, removeButton, projectDescription, projectDueDate);
            mainContent.appendChild(projectValue);
        };
    };
};
// checks if there is a displayed key 
const render = function(key, value) {
    if (key && value) {
        const groupedProjects = groupBy(key)[value];
        displayTask(groupedProjects)
    } else {
        const groupedProjects = JSON.parse(localStorage.getItem("to do items"))
        displayTask(groupedProjects)
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
export { render, dueToday, dueThisWeek, displayTask }
