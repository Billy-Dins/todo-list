import './style.css';

import { endOfWeek, startOfWeek, isThisWeek, parseISO } from 'date-fns'

// DOM //
const mainContent = document.querySelector('.main')

const datePicker = document.createElement('input');
datePicker.type = 'date'
mainContent.appendChild(datePicker);


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
    const priority = 'Low'
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
// loops through all items currently in the 'todoItems' array and determines if
// the item shares a common name with other projects then groups them into their
// own arrays.
function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
       const key = obj[property];
       if (!acc[key]) {
          acc[key] = [];
       }
       // Add object to list for given key's value
       acc[key].push(obj);
       return acc;
    }, {});
 }

 getItemValues('27-1-2023', 'Not chillin')
 getItemValues('27-1-2023', 'Not chillin')
 getItemValues('27-1-2023', 'Not chillin')
 getItemValues('27-1-2023', 'Chillin')

 const groupedProjects = groupBy(todoItems, 'project')
console.log(groupedProjects);