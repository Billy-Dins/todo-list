let todoItems = [];

const pushtoArray = function(newItem) {
    todoItems.push(newItem);
    localStorage.setItem("to do items", JSON.stringify(todoItems));
}
const todoItemFactory = function(title, description, dueDate, priority, project) {
    return { title, description, dueDate, priority, project };
}
// Primary called function that creates an object and assigns DOM
// objects to it.
const getItemValues = function(objectTitle, calendarSelection, projectTitle) {
    const title = objectTitle
    const description = 'fill up laundry bag, add laundry sauce then go down stairs, put it in the laundry machine and wash.'
    const dueDate = calendarSelection
    const priority = 'low'
    const project = projectTitle
    const newItem = todoItemFactory(title, description, dueDate, priority, project);
    pushtoArray(newItem)
}

// looks at all items currently in the selected array and determines if
// the item shares a common key with other items then returns them as grouped
// objects within an array
const groupBy = function(object) {
    return JSON.parse(localStorage.getItem("to do items")).reduce((acc, currentValue) => {
       const selectedValue = currentValue[object];
       if (!acc[selectedValue]) {
          acc[selectedValue] = [];
       }
       // Add object to list for given key's value
       acc[selectedValue].push(currentValue);
       return acc;
    }, {});
 };

 export { todoItems, getItemValues, groupBy }