import { groupBy, getItemValues } from "../logic";
import { render } from "./render.js";
import removeContent from "../DOM/remove.js"

const parentProjects = document.getElementById('nav-projects-parent')
const newTaskContent = document.getElementById('new-task-content')

let projectsList = [];

const removeNavProjects = function() {
    for (let i = 0; i < projectsList.length; i++) {
        if (parentProjects.hasChildNodes() === true) {
            parentProjects.firstChild.remove();
        }
    }
};

const renderNavProjects = function() {
    if (projectsList !== null) {
        removeNavProjects();
        const numProjects = projectsList.length
        for (let i = 0; i < numProjects; i++) {
            const project = document.createElement('button');
            project.addEventListener('click', () => {
                console.log('hello')
            });
            project.classList.add('nav-project')
            project.textContent = `${projectsList[i].title}`;
            parentProjects.appendChild(project);
        }
    }
};

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
            e.preventDefault();
            console.log(todoTitle.value)
            const title = todoTitle.value;
            projectsList.push({title: title, taskList: []});
            renderNavProjects();
            localStorage.setItem('todoProjects', JSON.stringify(projectsList));
        })

        newProjectForm.appendChild(todoTitle);
        newProjectForm.appendChild(addTaskButton);
        newTaskContent.appendChild(newProjectForm);
    } else return
}

export { renderNavProjects, createNewProject, }