import { isThisWeek, parseISO } from 'date-fns'

let todoItems = [];


const createTodoItem = {

    pushtoArray: function(newItem) {
        todoItems.push(newItem);
        localStorage.setItem("to do items", JSON.stringify(todoItems));
    },

    todoItemFactory: function(title, description, dueDate, priority, project) {
        return { title, description, dueDate, priority, project };
    },

    // Primary called function that creates an object and assigns DOM
    // objects to it.
    getItemValues: function(objectTitle, calendarSelection, projectTitle) {
        const title = objectTitle
        const description = 'fill up laundry bag, add laundry sauce then go down stairs, put it in the laundry machine and wash.'
        const dueDate = calendarSelection
        const priority = 'low'
        const project = projectTitle
        const newItem = createTodoItem.todoItemFactory(title, description, dueDate, priority, project);
        createTodoItem.pushtoArray(newItem)
    }
};

const todaysDate = function() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}-${month}-${year}`
};

const dueToday = function() {
    return todoItems.filter(item => item.dueDate === todaysDate());
};

const DueThisWeek = function() {
    let dueWeekArray = []
    for (let i = 0; i < todoItems.length; i++) {
        if (isThisWeek(parseISO(todoItems[i].dueDate))) {
            dueWeekArray.push(todoItems[i]);
        }
    }
    return dueWeekArray;
};

// looks at all items currently in the selected array and determines if
// the item shares a common key with other items then returns them as grouped
// objects within an array
const groupBy = function(key) {
    return todoItems.reduce((acc, currentValue) => {
       const groupedKeys = currentValue[key];
       if (!acc[groupedKeys]) {
          acc[groupedKeys] = [];
       }
       // Add object to list for given key's value
       acc[groupedKeys].push(currentValue);
       return acc;
    }, {});
 };

 export { todoItems, createTodoItem, todaysDate, dueToday, DueThisWeek, groupBy }