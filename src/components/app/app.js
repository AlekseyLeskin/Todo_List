import React from 'react';
// import ReactDOM from 'react-dom';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import { Component } from 'react'
import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    search: '',
    status: 'All'
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [
        ...todoData.slice(0, idx), 
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({todoData}) => {
      const newArray = [
        ...todoData,
        newItem
      ];
      return {
        todoData: newArray
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });
  };

  onSearch = (search) => {
    this.setState({
      search
    })
  }

  onStatusFilter = (text) => {
    this.setState({
      status: text
    })
  }

  filterByStatus(arr, status) {
    switch(status) {
      case 'Done':
        return arr.filter((el) => el.done);
      case 'Active':
        return arr.filter((el) => !el.done);
      case 'All':
        return arr;
      default:
        return arr;
    }
  }

  render() {

    const { todoData, search, status } = this.state;

    const foundItems = this.filterByStatus(todoData, status)
                        .filter((el) => el.label.toUpperCase()
                        .indexOf(search.toUpperCase()) >= 0);

    const doneCount = foundItems
                        .filter((el) => el.done).length;
    const todoCount = foundItems.length - doneCount;
  
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel 
            onSearch={ this.onSearch } />
          <ItemStatusFilter onStatusFilter={ this.onStatusFilter } />
        </div>
  
        <TodoList 
          todos={foundItems}
          onDeleted={ this.deleteItem }
          onToggleImportant={ this.onToggleImportant }
          onToggleDone={ this.onToggleDone } />
        <ItemAddForm onItemAdded={ this.addItem } />
      </div>
    );
  }
};