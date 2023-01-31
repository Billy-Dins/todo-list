import { isThisWeek, parse, } from 'date-fns'

import { projectsList } from './nav_render.js';
import { todoItems } from '../logic/logic.js'
import removeContent from './main_remove.js';

const removeAddTaskButton = function() {
    const addTaskButton = document.getElementById('add-task-btn');
    addTaskButton.remove();
};

const newTaskFactory = function(title, description, date) {
    return { title, description, date }
}

const addNewTask = function(taskObject) {
    const taskContainer = document.querySelector('#task-container');
    const newTask = document.createElement('div');
    newTask.classList.add('todo-item');

    const taskTitle = document.createElement('div');
    taskTitle.textContent = taskObject.title

    const taskDescription = document.createElement('div');
    taskDescription.textContent = taskObject.description;

    const taskDate = document.createElement('div');
    taskDate.textContent = taskObject.date;

    newTask.append(taskTitle, taskDescription, taskDate);
    taskContainer.appendChild(newTask)
}

const removeNewTaskForm = function() {
    const newTaskForm = document.querySelector('#new-task-form');
    newTaskForm.remove();
};
const addTaskForm = function(index) {
    const taskContainer = document.getElementById('task-container');
    const newTaskForm = document.createElement('form');
    newTaskForm.id = 'new-task-form';
    const formTitle = document.createElement('div');
    formTitle.id = 'new-task-title'
    formTitle.textContent = '*Title:'
    const formTitleInput = document.createElement('input')
    formTitleInput.id = 'new-task-title-input'
    formTitleInput.setAttribute('placeholder', 'What to do?');
    const formDescription = document.createElement('div');
    formDescription.id = 'new-task-description'
    formDescription.textContent = 'Notes';
    const descriptionInput = document.createElement('textarea');
    descriptionInput.id = 'new-task-description-input'
    descriptionInput.setAttribute('placeholder', "eg: I probably won't do this anyways")
    const formDate = document.createElement('div');
    formDate.id = 'new-task-date-title'
    formDate.textContent = 'Date:'
    const dateInput = document.createElement('input')
    dateInput.id = 'new-task-date-input'
    dateInput.setAttribute('type', 'date');
    const submitNewTaskButton = document.createElement('button');
    submitNewTaskButton.id = 'new-task-submit-btn';
    submitNewTaskButton.textContent = 'Submit';
    submitNewTaskButton.addEventListener('click', (e) => {
        e.preventDefault();
        const newTaskObject = newTaskFactory(formTitleInput.value, descriptionInput.value, dateInput.value)
        projectsList[index].taskList.push(newTaskObject);
        localStorage.setItem('todoProjects', JSON.stringify(projectsList));
        console.log(JSON.parse(localStorage.getItem('todoProjects')));
        addNewTask(newTaskObject);
        removeNewTaskForm();
        createAddTaskButton();
    })
    newTaskForm.append(formTitle, formTitleInput, formDescription, descriptionInput,formDate, dateInput, submitNewTaskButton);
    taskContainer.appendChild(newTaskForm);
    removeAddTaskButton();
};

const createAddTaskButton = function(index) {
    const mainContent = document.querySelector('.main');
    const addTask = document.createElement('button');
    addTask.id = 'add-task-btn'
    addTask.textContent = '+ Add task'
    addTask.addEventListener('click', () => {
        addTaskForm(index);
    });
    mainContent.appendChild(addTask);
};
// This function should create a task and push it to local storage.
// A different function should render localStorage to the webpage.
const displayProject = function(project, index) {
    const mainContent = document.querySelector('.main')
    const projectTitle = document.createElement('div');
    projectTitle.textContent = `${project.title}`;
    const taskContainer = document.createElement('div');
    taskContainer.id = 'task-container';
    removeContent();
    mainContent.appendChild(projectTitle);
    mainContent.appendChild(taskContainer);
    createAddTaskButton(index);
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
