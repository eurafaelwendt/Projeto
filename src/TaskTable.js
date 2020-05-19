import React, { Component } from 'react';
import './App.css';

const TableHead = () => {
    return (
        <thead>
            <tr>
                <th>State</th>
                <th>Task List</th>
                <th>Remove</th>
                <th>Edit</th>
            </tr>
        </thead>
    );
}

const TableBody = props => {
    const linhas = props.tasks.map((task) => {
        return (
            <tr key={task.id}>
                <td>
                    <p>
                        <label>
                            <input type="checkbox"
                                checked={task.status}
                                className="filled-in"
                                onChange={() => props.statusModify(task)} />
                            <span></span>
                        </label>
                    </p>
                </td>
                <td>{task.nome}</td>
                <td><button onClick={() => { props.removeTask(task) }}
                    className="waves-effect
                waves-light
                red
                btn">Remove</button>
                </td>
                <td><button onClick={() => {props.editTask(task)}}
                className="waves-effect
                waves-light
                orange
                btn">Edit</button>
                </td>
            </tr>
        );
    });

    return (
        <tbody>
            {linhas}
        </tbody>
    );
}

class TaskTable extends Component {
    render() {

        const { tasks, removeTask, statusModify, editTask } = this.props;

        return (
            <table className="centered highlight">
                <TableHead></TableHead>
                <TableBody tasks={tasks}
                    statusModify={statusModify}
                    removeTask={removeTask}
                    editTask={editTask}>
                </TableBody>
            </table>
        );
    }
}

export default TaskTable;