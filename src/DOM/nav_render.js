import { displayProject } from "./main_render";

const parentProjects = document.getElementById('nav-projects-parent')
const newProjectContent = document.getElementById('new-project-content')

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
    console.log(projectsList);
    const numProjects = projectsList.length
    for (let i = 0; i < numProjects; i++) {
        const project = document.createElement('button');
        project.addEventListener('click', () => {
            displayProject(projectsList[i]);
            currentProject = i;
        });
        project.classList.add('nav-project')
        project.textContent = `${projectsList[i].title}`;
        parentProjects.appendChild(project);
    };
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
            newProjectForm.remove();
        });
        const addTaskButton = document.createElement('button');
        addTaskButton.classList.add('new-todo-item')
        addTaskButton.id = 'add-todo-btn';
        addTaskButton.textContent = 'Add task';
        addTaskButton.addEventListener('click', (e) => {
            const title = projectTitle.value;
            projectsList.push({title: title, taskList: []});
            localStorage.setItem('todoProjects', JSON.stringify(projectsList));
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