import './style.css';
import './style.scss';

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
// looks at all items currently in the selected array and determines if
// the item shares a common key with other items then returns them as grouped
// objects within an array
const groupBy = function(array, key) {
    return array.reduce((acc, currentValue) => {
       const groupedKeys = currentValue[key];
       if (!acc[groupedKeys]) {
          acc[groupedKeys] = [];
       }
       // Add object to list for given key's value
       acc[groupedKeys].push(currentValue);
       return acc;
    }, {});
 };
 // render requested contents onto webpage function

 const render = function(array, todoItem, location) {
    const selectedTodo = array[todoItem]
    const parentContent = document.createElement('div');
    parentContent.classList.add(parseInt(selectedTodo));

    const childContent = document.createElement('div');
    childContent.classList.add(selectedTodo[title]);
    childContent.textContent = parseInt(selectedTodo[title]);
    parentContent.appendChild(childContent);

    location.appendChild(parentContent);
 };
// Need to add items to the todoItems array before this will work
 render(groupBy, 0, mainContent)