import { displayProject } from "./main_render";

const parentProjects = document.getElementById('nav-projects-parent')
const newTaskContent = document.getElementById('new-task-content')

let projectsList = [];
let currentProject = '';

// If localStorage has previously stored projects, sets them as the projectList array
const setProjectList = function() {
    const currentStorage = JSON.parse(localStorage.getItem('todoProjects'));
    if (currentStorage !== null) {
        projectsList = currentStorage;
    }
};

const renderNavProjects = function() {
    setProjectList();
    removeNavProjects();
    const numProjects = projectsList.length
    for (let i = 0; i < numProjects; i++) {
        const project = document.createElement('button');
        project.addEventListener('click', () => {
            displayProject(projectsList[i], i);
            currentProject = i;
        });
        project.classList.add('nav-project')
        project.textContent = `${projectsList[i].title}`;
        parentProjects.appendChild(project);
    };
};

// Gets input from input & adds it to working array & localStorage.
const createNewProject = function() {
    if (newTaskContent.hasChildNodes() === false) {
        const newProjectForm = document.createElement('form');
        newProjectForm.id = 'new-project-form';

        const todoTitle = document.createElement('input');
        todoTitle.classList.add('new-todo-item')
        todoTitle.id = 'add-todo-title-input'
        todoTitle.setAttribute('placeholder', "Todo title...")
        todoTitle.setAttribute('type', 'text');

        const addTaskButton = document.createElement('button');
        addTaskButton.classList.add('new-todo-item')
        addTaskButton.id = 'add-todo-btn';
        addTaskButton.textContent = 'Add task';
        addTaskButton.addEventListener('click', (e) => {
            const title = todoTitle.value;
            projectsList.push({title: title, taskList: []});
            localStorage.setItem('todoProjects', JSON.stringify(projectsList));
            renderNavProjects();
        });
        newProjectForm.appendChild(todoTitle);
        newProjectForm.appendChild(addTaskButton);
        newTaskContent.appendChild(newProjectForm);
    } else return
};

const removeNavProjects = function() {
    for (let i = 0; i < projectsList.length; i++) {
        if (parentProjects.hasChildNodes() === true) {
            parentProjects.firstChild.remove();
        }
    }
};

export { setProjectList, renderNavProjects, createNewProject, projectsList, currentProject }