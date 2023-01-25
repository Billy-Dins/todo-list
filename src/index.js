import './style.css';

import { endOfWeek, startOfWeek, isThisWeek, parseISO } from 'date-fns'

// DOM //
const mainContent = document.querySelector('.main')

const datePicker = document.createElement('input');
datePicker.type = 'date'
mainContent.appendChild(datePicker);
datePicker.addEventListener('change', () => {
    getItemValues();
    console.log(todoItems)
    filterItemWeek()
})

// LOGIC //
const todoItems = [];

const todaysDate = function() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}-${month}-${year}`
};

const getEndOfWeek = function() {
    let date = endOfWeek(new Date());
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}-${month}-${year}`
};

const getStartOfWeek = function() {
    let date = startOfWeek(new Date());
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
const getItemValues = function() {
    const title = 'Laundry'
    const description = 'fill up laundry bag, add laundry sauce then go down stairs, put it in the laundry machine and wash.'
    const dueDate = datePicker.value
    const priority = 'Low'
    const project = 'Chillin'
    const newItem = createTodoItem(title, description, dueDate, priority, project);
    pushtoArray(newItem)
};
// filters array for items that are due today.
const filterItemToday = function() {
    const filteredArray = todoItems.filter(item => item.dueDate === todaysDate());
}

const filterItemWeek = function() {
    let filteredArray = []
    for (let i = 0; i < todoItems.length; i++) {
        if (isThisWeek(parseISO(todoItems[i].dueDate))) {
            filteredArray.push(todoItems[i]);
            console.log(filteredArray)
        }
    }
}

console.log(todoItems)
getItemValues();
filterItemWeek();
