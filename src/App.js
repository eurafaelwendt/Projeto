import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import Header from './Header';
import './App.css';
import Form from './Form';
import TaskTable from './TaskTable';
import Options from './Options';

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
      tasks: [{
        id: 0,
        status: false,
        nome: 'React'
      },
      {
        id: 1,
        status: false,
        nome: 'Rafael'
      },
      {
        id: 2,
        status: false,
        nome: 'CSS'
      }],
      filterFn: 'all',
      filterText: ''
    }
}

  // Edita a task
  editTask = task => {

    const { tasks } = this.state;
    const edit = prompt("Edit task:");

    this.setState(
      {
        tasks: tasks.map((t) => {
          if(task.id !== t.id){
            return t;
          }else{
            task.nome = edit;
            return task;
          }
        }),
      }
    );
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

    // return(
    //   <p>
    //   <label>
    //     <input type="checkbox"
    //       checked="checked"
    //       className="filled-in" />
    //     <span></span>
    //   </label>
    // </p>
    // );
  }

  // Remove uma task da lista
  removeTask = task => {

    const { tasks } = this.state;

    this.setState(
      {
        tasks: tasks.filter((t) => {
          return task.id !== t.id;
        }),
      }
    );
  }

  // Remove todas as tasks da lista
  removeAll = () => {

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
        { id: this.state.tasks.length, nome: task.nome, status: false }
      ]
    })
  }

  render() {
    return (
      <Fragment>
        <Header></Header>
        <div className="container">
          <Form listenerSubmit={this.listenerSubmit}
          setFilterText={this.setFilterText}></Form>
          <p>
            <label>
              <input className="with-gap"
                name="group1"
                type="radio"
                onClick={this.filterRadiousAll}/>
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
          <button onClick={this.removeAll} className="waves-effect waves-light red btn margin">Remove all</button>
        </div>
        <Options></Options>
      </Fragment>
    );
  }
}
export default App;
