import { groupBy } from './logic.js'

const DOM = {
    mainContent: document.querySelector('.main'),

    // render selected project onto webpage
    render: function(keyValue) {
        const groupedProjects = groupBy('project')[keyValue];
        console.log(groupedProjects);
        for (let i = 0; i < groupedProjects.length; i++) {
            const projectValue = document.createElement('div');
            projectValue.id = `project-value-${i}`
            const projectTitle = document.createElement('div');
            projectTitle.textContent = `${groupedProjects[i].title}`
            const projectDescription = document.createElement('div');
            projectDescription.textContent = `${groupedProjects[i].description}`
            const projectDueDate = document.createElement('div');
            projectDueDate.textContent = `Project is due: ${groupedProjects[i].dueDate}`
            const projectPriority = document.createElement('div');
            projectPriority.textContent = `Priority is ${groupedProjects[i].priority}`
            projectValue.append(projectTitle, projectDescription, projectDueDate, projectPriority);
            DOM.mainContent.appendChild(projectValue);
        }
    },
}

export default DOM
