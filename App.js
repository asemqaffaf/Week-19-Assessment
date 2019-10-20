import React, { Component } from 'react';
import axios from 'axios';
import AddTodoItem from './components/AddTodoItem';
import Todos from './components/Todos';

export default class App extends Component {
  state = {
    tasks: [],
    message: 'message from app component',
    title: 'title from app component'
  };

  componentDidMount() {
    axios
      .get('http://localhost:9000/tasks')
      .then(res => {
        const tasks = res.data;
        this.setState({ tasks });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Q2: we have 6 errors here please fix them [6 pt]
  addTodoItem = newTask => {
    axios
      .get(`http://localhost:9000/getTasks/${newTask}`)
      .then((res) => {
        const result = res.data; // or i can just add res.data to the set state
        // this.state.tasks = result;
        this.setState({
          tasks : result  /// or i can make it like res.data
        })
      })
      .catch(error => {
        console.log(error);
      });
  };

  toggleComplete = id => {
    axios
      .put(`http://localhost:9000/toggleTask/${id}`)
      .then(res => {
        const tasks = res.data;
        this.setState({ tasks });
      })
      .catch(error => {
        console.log(error);
      });
  };

  deleteItem = id => {
    axios
      .delete(`http://localhost:9000/tasks/${id}`)
      .then(res => {
        const tasks = res.data;
        this.setState({ tasks });
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const { addTodoItem, toggleComplete, deleteItem } = this;
    const { tasks, message, title } = this.state;
    return (
      <React.Fragment>
        <AddTodoItem addTodoItem={addTodoItem} />
        <Todos
          tasks={tasks}
          toggleComplete={toggleComplete}
          deleteItem={deleteItem}
        />
      </React.Fragment>
    );
  }
}
