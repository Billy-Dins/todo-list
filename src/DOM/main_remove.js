const mainContent = document.querySelector('.main');

const removeContent = function () {
    for (let i = mainContent.childElementCount; i > 0; i--) {
        mainContent.firstChild.remove();
    };
};

const refreshContent = function() {
    const taskContainer = document.getElementById('task-container')
    while (taskContainer.hasChildNodes()) {
        taskContainer.firstChild.remove();
    }
};

export { removeContent, refreshContent }