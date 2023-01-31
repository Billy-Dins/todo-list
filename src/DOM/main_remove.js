const mainContent = document.querySelector('.main');

const removeContent = function () {
    for (let i = mainContent.childElementCount; i > 0; i--) {
        mainContent.firstChild.remove();
    };
};

export default removeContent