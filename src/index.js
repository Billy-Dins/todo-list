import './style.css';
import './style.scss';

import { endOfWeek, startOfWeek, isThisWeek, parseISO } from 'date-fns'

// DOM //
const mainContent = document.querySelector('.main')

const datePicker = document.createElement('input');
datePicker.type = 'date'
mainContent.appendChild(datePicker);

 // render requested contents onto webpage
 const render = function(keyValue) {
    const groupedProjects = groupBy('project')[keyValue];
    for (let i = 0; i < groupedProjects.length; i++) {
        const projectValue = document.createElement('div');
        projectValue.id = `project-value-${i}`
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
    }
 };

// LOGIC //
let todoItems = [];

const todaysDate = function() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}-${month}-${year}`
};

const createTodoItem = function(title, description, dueDate, priority, project) {
    return { title, description, dueDate, priority, project };
};

const pushtoArray = function(newItem) {
    todoItems.push(newItem);
};

// Primary called function that creates an object and assigns DOM
// objects to it.
const getItemValues = function(calendarSelection, projectTitle) {
    const title = 'Laundry'
    const description = 'fill up laundry bag, add laundry sauce then go down stairs, put it in the laundry machine and wash.'
    const dueDate = calendarSelection
    const priority = 'low'
    const project = projectTitle
    const newItem = createTodoItem(title, description, dueDate, priority, project);
    pushtoArray(newItem)
};

const dueToday = function() {
    let dueTodayArray = todoItems.filter(item => item.dueDate === todaysDate());
};

const DueThisWeek = function() {
    let dueWeekArray = []
    for (let i = 0; i < todoItems.length; i++) {
        if (isThisWeek(parseISO(todoItems[i].dueDate))) {
            dueWeekArray.push(todoItems[i]);
        }
    }
};
// looks at all items currently in the selected array and determines if
// the item shares a common key with other items then returns them as grouped
// objects within an array
const groupBy = function(key) {
    return todoItems.reduce((acc, currentValue) => {
       const groupedKeys = currentValue[key];
       if (!acc[groupedKeys]) {
          acc[groupedKeys] = [];
       }
       // Add object to list for given key's value
       acc[groupedKeys].push(currentValue);
       return acc;
    }, {});
 };

 getItemValues('27-1-2023', 'Chillin')
 getItemValues('28-1-2023', 'Not chillin')
 getItemValues('29-1-2023', 'Chillin')
 getItemValues('27-1-2023', 'Chillin')
 getItemValues('28-1-2023', 'Not chillin')
 getItemValues('29-1-2023', 'Chillin')
 
 render('Chillin');
