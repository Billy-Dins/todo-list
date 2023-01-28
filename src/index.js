import './style.css';
import './style.scss';

import render from './DOM/render.js'
import homeLoad from './DOM/webpage.js'

import { todoItems, createTodoItem, todaysDate, dueToday, DueThisWeek, groupBy } from './logic.js'

createTodoItem.getItemValues('Laundry', '28-1-2023', 'Chillin')
createTodoItem.getItemValues('Dishes', '28-1-2023', 'Chillin')
createTodoItem.getItemValues('Dishes', '28-1-2023', 'Not chillin')

homeLoad();