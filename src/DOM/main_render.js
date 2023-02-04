import { isThisWeek, parse, } from 'date-fns'

import { projectsList, currentProject, renderNavProjects } from './nav_render.js';
import { removeContent, refreshContent } from './main_remove.js';

const mainContent = document.querySelector('#main-content')

const renderHome = function() {
    const projectTitle = document.createElement('div');
    projectTitle.id = 'home-content-title'
    projectTitle.textContent = 'Home';
    const taskContainer = document.createElement('div');
    taskContainer.id = 'task-container';
    mainContent.appendChild(projectTitle);
    mainContent.appendChild(taskContainer);
    for (let i = 0; i < projectsList.length; i++) {
        const project = projectsList[i];
        renderLocalStorage(project);
    }
};

const renderLocalStorage = function (project) {
    const taskContainer = document.querySelector('#task-container');
    const taskList = project.taskList;
    const homeTitle = document.querySelector('#home-content-title');
    for (let i = 0; i < taskList.length; i++) {
        const newTask = document.createElement('div');
        newTask.classList.add('todo-item');
        const taskTitle = document.createElement('div');
        taskTitle.id = 'task-title'
        taskTitle.textContent = taskList[i].title

        if (!homeTitle) {
            const taskRemove = document.createElement('button');
            taskRemove.id = 'remove-task-btn'
            taskRemove.textContent = 'Complete';
            taskRemove.addEventListener('click', () => {
                projectsList[currentProject].taskList.splice(i, 1);
                localStorage.setItem('todoProjects', JSON.stringify(projectsList));
                displayProject(project)
            })
            newTask.appendChild(taskRemove)
        };
        const taskDescription = document.createElement('div');
        taskDescription.id = 'task-description'
        taskDescription.textContent = taskList[i].description;
        const taskDate = document.createElement('div');
        taskDate.id = 'task-date'
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

    const formRemove = document.createElement('button');
    formRemove.textContent = 'X';
    formRemove.id = 'new-task-remove-btn';
    formRemove.setAttribute('onsubmit', 'return false')
    formRemove.addEventListener('click', (e) => {
        newTaskForm.remove();
        createAddTaskButton();
    })

    const formTitleInput = document.createElement('input')
    formTitleInput.id = 'new-task-title-input'
    formTitleInput.setAttribute('placeholder', 'What to do?');
    formTitleInput.required = true

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
    newTaskForm.append(formTitle, formRemove, formTitleInput, formDescription, descriptionInput,formDate, dateInput, submitNewTaskButton);
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
    const projectModule = document.createElement('div');
    projectModule.id = 'project-module'
    const projectTitle = document.createElement('div');
    projectTitle.id = 'project-title'
    projectTitle.textContent = `${project.title}`;
    const removeProjectButton = document.createElement('button');
    removeProjectButton.id = 'remove-project-btn'
    removeProjectButton.textContent = 'X'
    removeProjectButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm("You are about to delete this project and all its tasks.")) {
            projectsList.splice(currentProject, 1);
            localStorage.setItem('todoProjects', JSON.stringify(projectsList));
            renderNavProjects();
            removeContent();
            renderHome();
        } else {
            return
        }
    });
    const taskContainer = document.createElement('div');
    taskContainer.id = 'task-container';
    removeContent();
    projectModule.append(taskContainer);
    mainContent.append(projectTitle, removeProjectButton, projectModule);
    renderLocalStorage(project);
    createAddTaskButton();
};

const renderDueDate = function(filteredArray, dueDate) {
    const projectTitle = document.createElement('div');
    projectTitle.textContent = `Due ${dueDate}`;
    const taskContainer = document.createElement('div');
    taskContainer.id = 'task-container';
    for (let i = 0; i < filteredArray.length; i++) {
        const newTask = document.createElement('div');
        newTask.classList.add('todo-item');
        const taskTitle = document.createElement('div');
        taskTitle.id = 'task-title'
        taskTitle.textContent = filteredArray[i].title
        const taskDescription = document.createElement('div');
        taskDescription.id = 'task-description'
        taskDescription.textContent = filteredArray[i].description;
        const taskDate = document.createElement('div');
        taskDate.id = 'task-date'
        taskDate.textContent = filteredArray[i].date;
        newTask.append(taskTitle, taskDescription, taskDate);
        taskContainer.appendChild(newTask)
    };
    mainContent.appendChild(projectTitle);
    mainContent.appendChild(taskContainer);
}

const todaysDate = function() {
    let date = new Date();
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let year = date.getFullYear();
    return `${year}-${month}-${day}`
};

const dueToday = function() {
    let filteredArray = []
    for (let i = 0; i < projectsList.length; i++) {
        let todoList = projectsList[i].taskList
        for (let i = 0; i < todoList.length; i++){
            if (todoList[i].date == todaysDate()) {
                filteredArray.push(todoList[i])
            }
        }
    }
    return filteredArray;
};

const dueThisWeek = function() {
    let dueWeekArray = []
    for (let i = 0; i < projectsList.length; i++) {
        let project = projectsList[i];
        for (let j = 0; j < project.taskList.length; j++) {
            let taskListItem = project.taskList;
            if (isThisWeek(parse(taskListItem[j].date, 'yyyy-mm-dd', new Date()))) {
                dueWeekArray.push(taskListItem[j]);
            }
        }
    }
    return dueWeekArray;
};
export { renderHome, dueToday, dueThisWeek, renderDueDate, displayProject }
