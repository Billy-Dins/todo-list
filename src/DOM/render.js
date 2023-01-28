import { groupBy, todoItems } from '../logic.js'

// render selected project & its todos onto webpage
const render = function(key, value) {
    const groupedProjects = groupBy(key)[value];
    const mainContent = document.querySelector('.main')
    for (let i = 0; i < groupedProjects.length; i++) {
        const projectValue = document.createElement('div');
        projectValue.classList.add('todo-item')
        projectValue.id = `todo-item-${i}`
        const projectTitle = document.createElement('div');
        projectTitle.textContent = `${groupedProjects[i].title}`
        const projectDescription = document.createElement('div');
        projectDescription.textContent = `${groupedProjects[i].description}`
        const projectDueDate = document.createElement('div');
        projectDueDate.textContent = `Project is due: ${groupedProjects[i].dueDate}`
        const projectPriority = document.createElement('div');
        projectPriority.textContent = `Priority is ${groupedProjects[i].priority}`
        projectValue.append(projectTitle, projectDescription, projectDueDate, projectPriority);
        mainContent.appendChild(projectValue);
    }
};

export default render
