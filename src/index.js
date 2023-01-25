import './style.css';

const todoItems = [{}];
const mainContent = document.querySelector('.main')

const createTodoItem = function(title, description, dueDate, priority, project) {
    return { title, description, dueDate, priority, project };
};

const pushtoArray = function(newItem) {
    checkObjectProject(newItem);
    todoItems.push(newItem);
    };


// Primary called function that creates an object and assigns DOM
// objects to it.
const getItemValues = function() {
    const title = 'Laundry'
    const description = 'fill up laundry bag, add laundry sauce then go down stairs, put it in the laundry machine and wash.'
    const dueDate = 'Today'
    const priority = 'Low'
    const project = 'Chillin'
    const newItem = createTodoItem(title, description, dueDate, priority, project);
    pushtoArray(newItem)
};
// Checks if newly created object has a 'project' value that matches
// pre-existing projects.

/* This might be easier with an array sort method instead of a for loop. */
const checkObjectProject = function(newItem) {
    for (let i = 0; i < todoItems.length; i++) {
        if (newItem.project === todoItems[i].project) {
            const oldProject = document.querySelector(`.${newItem.project}`)
            const newTodoItem = document.createElement('div');
            newTodoItem.textContent = newItem.title;
            oldProject.appendChild(newTodoItem);
        } else {
            const newProject = document.createElement('div');
            newProject.classList.add(newItem.project);
            const newTodoItem = document.createElement('div');
            newTodoItem.textContent = newItem.title;
            newProject.appendChild(newTodoItem);
            mainContent.appendChild(newProject);
        }
    }
};
getItemValues();
getItemValues();
todoItems