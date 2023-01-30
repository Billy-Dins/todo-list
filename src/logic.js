let todoItems = JSON.parse(localStorage.getItem('to do items'));

const pushtoArray = function(newItem) {
    todoItems.push(newItem)
    localStorage.setItem('to do items', JSON.stringify(todoItems));
}
const todoItemFactory = function(title, description, project, dueDate) {
    return { title, description, project, dueDate };
}
// Primary called function that creates an object and assigns DOM
// objects to it.
const getItemValues = function(title, description, project, dueDate) {
    const newItem = todoItemFactory(title, description, project, dueDate);
    pushtoArray(newItem)
};

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