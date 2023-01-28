import { todoItems, groupBy } from "../logic";
import render from "./render.js";

const homeLoad = function () {
    const mainContent = document.querySelector('.main');
    const homeButton = document.getElementById('home-btn');
    homeButton.addEventListener('click', function() {
        for (let i = 0; i <= mainContent.childElementCount; i++) {
            if (mainContent.firstChild !== null) {
            mainContent.firstChild.remove();
            }
        };
        render('project', 'Chillin');
    })
};

export default homeLoad;