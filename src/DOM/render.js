import { isThisWeek, parse, } from 'date-fns'

import { groupBy, todoItems } from '../logic.js'

// render selected project & its todos onto webpage
const displayObject = function(groupedProjects) {
    const mainContent = document.querySelector('.main')
    for (let i = 0; i < groupedProjects.length; i++) {
        const projectValue = document.createElement('div');
        projectValue.classList.add('todo-item')
        projectValue.id = `todo-item-${i}`
        const projectTitle = document.createElement('div');
        projectTitle.textContent = `${groupedProjects[i].title}`
        const projectDescription = document.createElement('div');
        projectDescription.textContent = `${groupedProjects[i].description}`
        const projectDueDate = document.createElement('div');
        projectDueDate.textContent = `Project is due: ${groupedProjects[i].dueDate}`
        const projectPriority = document.createElement('div');
        projectPriority.textContent = `Priority is ${groupedProjects[i].priority}`
        projectValue.append(projectTitle, projectDescription, projectDueDate, projectPriority);
        mainContent.appendChild(projectValue);
    };
};
// checks if there is a displayed key 
const render = function(key, value) {
    if (key && value) {
        const groupedProjects = groupBy(key)[value];
        displayObject(groupedProjects)
    } else {
        const groupedProjects = JSON.parse(localStorage.getItem("to do items"))
        displayObject(groupedProjects)
    }
};
const todaysDate = function() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}-${month}-${year}`
};

const dueToday = function() {
    return todoItems.filter(item => item.dueDate === todaysDate());
};

const dueThisWeek = function() {
    let dueWeekArray = []
    for (let i = 0; i < todoItems.length; i++) {
        let newDate = todoItems[i].dueDate;
        if (isThisWeek(parse(newDate, 'dd-mm-yyyy', new Date()))) {
            dueWeekArray.push(todoItems[i]);
        }
    }
    return dueWeekArray;
};
export { render, dueToday, dueThisWeek, displayObject }
