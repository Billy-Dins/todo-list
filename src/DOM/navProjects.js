import { groupBy, getItemValues } from "../logic";
import { render } from "./render.js";
import removeContent from "../DOM/remove.js"

const parentProjects = document.getElementById('nav-projects-parent')
const newTaskContent = document.getElementById('new-task-content')

const navProjects = function() {
    const mainContent = document.querySelector('main')
    if (mainContent.firstChild !== null) {
        const allProjects = groupBy('project')
        const numProjects = Object.keys(allProjects).length
        for (let i = 0; i < numProjects; i++) {
            const project = document.createElement('button');
            project.addEventListener('click', () => {
                removeContent();
                render('project', `${Object.keys(allProjects)[i]}`)
            });
            project.classList.add('nav-project')
            project.textContent = `${Object.keys(allProjects)[i]}`;
            parentProjects.appendChild(project);
        }
    };
};

const createTodo = function() {
    if (newTaskContent.hasChildNodes() === false) {
        const newProjectForm = document.createElement('form');
        newProjectForm.id = 'new-project-form';

        const todoTitle = document.createElement('input');
        todoTitle.classList.add('new-todo-item')
        todoTitle.id = 'add-todo-title-input'
        todoTitle.setAttribute('placeholder', "Todo title...")
        todoTitle.setAttribute('type', 'text');

        const todoDescription = document.createElement('textarea');
        todoDescription.classList.add('new-todo-item')
        todoDescription.id = 'add-todo-description-input'
        todoDescription.setAttribute('placeholder', "Todo description...")

        const todoProject = document.createElement('input');
        todoProject.classList.add('new-todo-item');
        todoProject.id = 'add-todo-project-input'
        todoProject.setAttribute('placeholder', 'Project title...')

        const todoDue = document.createElement('input');
        todoDue.classList.add('new-todo-item');
        todoDue.id = 'add-todo-dueDate-input'
        todoDue.setAttribute('type', 'date');
        todoDue.setAttribute('placeholder', 'Due date...')

        const todoButton = document.createElement('button');
        todoButton.classList.add('new-todo-item')
        todoButton.id = 'add-todo-btn';
        todoButton.textContent = 'Add task';
        todoButton.addEventListener('click', (e) => {
            e.preventDefault();
            const title = todoTitle.value;
            const description = todoDescription.value;
            const project = todoProject.value;
            const dueDate = todoDue.value;
            getItemValues(title, description, project, dueDate);
            removeContent();
            render();
            navProjects();
        })

        newProjectForm.appendChild(todoTitle);
        newProjectForm.appendChild(todoDescription);
        newProjectForm.appendChild(todoProject);
        newProjectForm.appendChild(todoDue);
        newProjectForm.appendChild(todoButton);
        newTaskContent.appendChild(newProjectForm);
    } else return
}

export { navProjects, createTodo }