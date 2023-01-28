import './style.css';
import './style.scss';

import DOM from './DOM.js'
import { todoItems, createTodoItem, todaysDate, dueToday, DueThisWeek, groupBy } from './logic.js'

createTodoItem.getItemValues('28-1-2023', 'Chillin')
createTodoItem.getItemValues('28-1-2023', 'Chillin')

DOM.render('Chillin');