import { removeContent } from "./main_remove";
import { displayProject } from "./main_render";

import plus from '../icons/plus.png'

const parentProjects = document.getElementById('nav-projects-parent')
const newProjectContent = document.getElementById('new-project-content')

let projectsList = [];
let currentProject = 0;

// If localStorage has previously stored projects, sets them as the projectList array
const setProjectList = function() {
    const currentStorage = JSON.parse(localStorage.getItem('todoProjects'));
    if (currentStorage !== null) {
        projectsList = currentStorage;
    }
};

const createNewProjectButton = function() {
    const newProjectButtonContainer = document.querySelector('#create-project-container')
    const plusIcon = new Image();
    plusIcon.src = plus;
    const newProjectText = document.createElement('div')
    newProjectText.textContent = 'Create new project'
    newProjectButtonContainer.append(plusIcon, newProjectText)
}

const renderNavProjects = function() {
    setProjectList();
    removeNavProjects();
    createNewProjectButton();
    const newProjectForm = document.getElementById('new-project-content')
    const numProjects = projectsList.length
    for (let i = 0; i < numProjects; i++) {
        const project = document.createElement('button');
        project.addEventListener('click', () => {
            if (newProjectForm.hasChildNodes()) {
                newProjectForm.firstChild.remove();
            }
            currentProject = i;
            displayProject(projectsList[i]);
        });
        project.classList.add('nav-project')
        project.textContent = `${projectsList[i].title}`;
        parentProjects.appendChild(project);
    };
};

let newProject = function(projectTitle, arry) {
    return { title: projectTitle, taskList: arry }
};

const removeNewProjectForm = function() {
    const newProjectForm = document.getElementById('new-project-form');
    newProjectForm.remove()
};

// Gets input from input & adds it to working array & localStorage.
const createNewProject = function() {
    if (newProjectContent.hasChildNodes() === false) {
        const newProjectForm = document.createElement('form');
        newProjectForm.id = 'new-project-form';

        const projectTitle = document.createElement('input');
        projectTitle.classList.add('new-todo-item')
        projectTitle.id = 'add-todo-title-input'
        projectTitle.setAttribute('placeholder', "Project title...")
        projectTitle.setAttribute('type', 'text');
        
        const exitForm = document.createElement('button');
        exitForm.textContent = 'X';
        exitForm.id = 'project-form-remove-btn';
        exitForm.addEventListener('click', (e) => {
            e.preventDefault();
            removeNewProjectForm();
        });
        const addTaskButton = document.createElement('button');
        addTaskButton.classList.add('new-todo-item')
        addTaskButton.id = 'add-todo-btn';
        addTaskButton.textContent = 'Add task';
        addTaskButton.addEventListener('click', (e) => {
            e.preventDefault();
            let project = newProject(projectTitle.value, [])
            projectsList.push(project);
            localStorage.setItem('todoProjects', JSON.stringify(projectsList));
            removeContent();
            displayProject(project);
            removeNewProjectForm();
            renderNavProjects();
        });
        newProjectForm.appendChild(projectTitle);
        newProjectForm.appendChild(exitForm);
        newProjectForm.appendChild(addTaskButton);
        newProjectContent.appendChild(newProjectForm);
    } else return
};

const removeNavProjects = function() {
    while (parentProjects.hasChildNodes() === true) { {
            parentProjects.firstChild.remove();
        }
    }
};

export { setProjectList, renderNavProjects, createNewProject, projectsList, currentProject }