import { isThisWeek, parse, } from 'date-fns'

import { projectsList, currentProject } from './nav_render.js';
import { removeContent, refreshContent } from './main_remove.js';

const mainContent = document.querySelector('.main')

const renderHome = function() {
    const projectTitle = document.createElement('div');
    projectTitle.textContent = 'Home';
    mainContent.appendChild(projectTitle);
    for (let i = 0; i < projectsList.length; i++) {
        const taskContainer = document.createElement('div');
        taskContainer.id = 'task-container';
        mainContent.appendChild(taskContainer);
        const project = projectsList[i];
        renderLocalStorage(project);
    };
}

const renderLocalStorage = function (project) {
    const taskContainer = document.querySelector('#task-container');
    const taskList = project.taskList;
    for (let i = 0; i < taskList.length; i++) {
        const newTask = document.createElement('div');
        newTask.classList.add('todo-item');
        const taskTitle = document.createElement('div');
        taskTitle.textContent = taskList[i].title
        const taskDescription = document.createElement('div');
        taskDescription.textContent = taskList[i].description;
        const taskDate = document.createElement('div');
        taskDate.textContent = taskList[i].date;
        newTask.append(taskTitle, taskDescription, taskDate);
        taskContainer.appendChild(newTask)
    };
};

const newTaskFactory = function(title, description, date) {
    return { title, description, date }
};

const removeNewTaskForm = function() {
    const newTaskForm = document.querySelector('.new-task-form');
    newTaskForm.remove();
};

const pushNewTask = function(newTask) {
    projectsList[currentProject].taskList.push(newTask);
    localStorage.setItem('todoProjects', JSON.stringify(projectsList));
    removeNewTaskForm();
    refreshContent();
    renderLocalStorage(projectsList[currentProject]);
    createAddTaskButton();
};

const removeAddTaskButton = function() {
    const addTaskButton = document.getElementById('add-task-btn');
    addTaskButton.remove();
};

const addTaskForm = function() {
    const newTaskForm = document.createElement('form');
    newTaskForm.classList.add('new-task-form');
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
        pushNewTask(newTaskFactory(formTitleInput.value, descriptionInput.value, dateInput.value));
    })
    newTaskForm.append(formTitle, formTitleInput, formDescription, descriptionInput,formDate, dateInput, submitNewTaskButton);
    mainContent.appendChild(newTaskForm);
};
// Creates the button that creates the add task form.
const createAddTaskButton = function() {
    const addTask = document.createElement('button');
    addTask.id = 'add-task-btn'
    addTask.textContent = '+ Add task'
    addTask.addEventListener('click', () => {
        addTaskForm();
        removeAddTaskButton();
    });
    mainContent.appendChild(addTask);
};

// Called by clicking a project title in the nav bar
const displayProject = function(project) {
    const projectTitle = document.createElement('div');
    projectTitle.textContent = `${project.title}`;
    const taskContainer = document.createElement('div');
    taskContainer.id = 'task-container';
    removeContent();
    mainContent.appendChild(projectTitle);
    mainContent.appendChild(taskContainer);
    renderLocalStorage(project);
    createAddTaskButton();
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
    for (let i = 0; i <= projectsList.length; i++) {
        if (projectsList[i].taskList === undefined) {
            return
        } else {
            const filteredList = projectsList[i].taskList.filter(item => item.dueDate === todaysDate());
        }
    }
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
export { renderHome, dueToday, dueThisWeek, displayProject }
