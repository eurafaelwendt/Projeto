import React, { Component, Fragment } from 'react';
import Header from './Header';
import './App.css';
import Form from './Form';
import TaskTable from './TaskTable';

// Filtra apenas as tarefas finalizadas
const filterDone = (tasks) => {
  return tasks.filter((task) => task.status);
};

// Filtra por tarefas para fazer
const filterTodo = (tasks) => {
  return tasks.filter((task) => !task.status);
};

// Filtra todas as tarefas
const filterAll = (tasks) => tasks;

// Filtra por texto
const filterByText = (tasks, txt) => {

  const regex = new RegExp(txt, 'i');
  const words = tasks.filter((task => {

    return regex.test(task.nome);
  }))
  return words;
}

// Chamadas de função para os filtros
const fns = {
  all: filterAll,
  done: filterDone,
  todo: filterTodo,
  byText: filterByText,
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      filterFn: 'all',
      filterText: '',
    }

    const string = localStorage.getItem("tasks");
    const value = JSON.parse(string);

    if (value !== null) {
      this.state.tasks = value;
    }
  }

  // Edita a task
  editTask = task => {

    const { tasks } = this.state;
    const edit = prompt("Edit task:");

    this.setState(
      {
        tasks: tasks.map((t) => {
          if (task.id !== t.id) {
            return t;
          }
          if (edit !== '') {
            console.log(edit);
            task.nome = edit;
            return task;
          } else {
            return t;
          }
        }),
      }
    );

    setTimeout(() => {
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }, 0)
  }

  // Modifica o status da tarefa concluida/pendente
  statusModify = task => {

    const { tasks } = this.state;

    this.setState(
      {
        tasks: tasks.map((t) => {
          if (task.id !== t.id) {
            return t;
          }
          return { ...task, status: !task.status }
        }),
      }
    );

    setTimeout(() => {
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }, 0)
  }

  // Remove uma task da lista
  removeTask = task => {

    const { tasks } = this.state;

    this.setState(
      {
        tasks: tasks.filter((t) => {
          if (task.id !== t.id) {
            return t;
          }
        }),
      }
    );

    setTimeout(() => {
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }, 0)
  }

  // Remove todas as tasks da lista
  removeAll = () => {

    localStorage.removeItem('tasks');

    this.setState(
      {
        tasks: []
      }
    );
  }

  // Filtra todas as tasks da lista
  filterRadiousAll = () => {
    this.setState({
      ...this.state,
      filterFn: 'all',
      filterText: ''
    });
  }

  // Filtra as tasks finalizadas
  filterRadiousDone = () => {
    this.setState({
      ...this.state,
      filterFn: 'done',
      filterText: ''
    });
  }

  // Filtra as tasks para fazer
  filterRadiousToDo = () => {
    this.setState({
      ...this.state,
      filterFn: 'todo',
      filterText: ''
    });
  }

  // Filtra por texto
  setFilterText = (text) => {
    this.setState({
      ...this.state,
      filterText: text,
      filterFn: text !== '' ? 'byText' : 'all'
    })
  }

  // Adiciona uma nova task
  listenerSubmit = task => {

    this.setState({
      tasks: [
        ...this.state.tasks,
        { id: this.state.tasks.length, status: false, nome: task.nome }
      ]
    })

    setTimeout(() => {
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }, 0)
  }

  csvTask = async () => {
    const fileName = "Tasks List";
    const json = JSON.stringify(this.state.tasks);
    const blob = new Blob([json],{type:'application/json'});
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  render() {
    return (
      <Fragment>
        <Header changeTheme={this.props.changeTheme}></Header>
        <div className="container">
          <Form listenerSubmit={this.listenerSubmit}
            setFilterText={this.setFilterText}
            tasks={this.state.tasks}></Form>
          <p>
            <label>
              <input className="with-gap"
                name="group1"
                type="radio"
                onClick={this.filterRadiousAll} />
              <span>All</span>
            </label>
            <label className="margin">
              <input className="with-gap"
                name="group1" type="radio"
                onClick={this.filterRadiousDone} />
              <span>Done</span>
            </label>
            <label className="margin">
              <input className="with-gap"
                name="group1"
                type="radio"
                onClick={this.filterRadiousToDo} />
              <span>ToDo</span>
            </label>
          </p>
          <TaskTable tasks={fns[this.state.filterFn](this.state.tasks, this.state.filterText)}
            status={this.state.tasks.status}
            removeTask={this.removeTask}
            removeAll={this.removeAll}
            statusModify={this.statusModify}
            editTask={this.editTask}>
          </TaskTable>
          <button onClick={this.removeAll} className="margin">REMOVE ALL</button>
          <button className="margin" onClick={this.csvTask} style={{backgroundColor:"#4db6ac"}}>DOWNLOAD THE TASKS</button>
        </div>
      </Fragment>
    );
  }
}
export default App;
