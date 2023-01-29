import { groupBy } from "../logic";
import { render } from "../DOM/render.js";
import removeContent from "../DOM/remove.js"

const parentProjects = document.getElementById('nav-projects')

const navProjects = function() {
    const allProjects = groupBy('project')
    const numProjects = Object.keys(allProjects).length
    for (let i = 0; i < numProjects; i++) {
        const project = document.createElement('button');
        project.addEventListener('click', () => {
            removeContent();
            render('project', `${Object.keys(allProjects)[i]}`)
        })
        project.textContent = `${Object.keys(allProjects)[i]}`;
        parentProjects.appendChild(project);
    }
};

const newProject = function() {
    console.log('hello')
}

export { navProjects, newProject }