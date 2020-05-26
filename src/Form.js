import React, { Component } from 'react';
import './App.css';
import FormValiadator from './FormValidator';
// import App from './App.js';

class Form extends Component {

    constructor(props) {
        super(props);

        this.validator = new FormValiadator({
            field: 'nome',
            method: 'isEmpty',
        });

        this.stateInicial = {
            nome: '',
        }

        this.state = this.stateInicial;
    }

    // Recupera o conteúdo do input de adicionar novas tasks
    listenerInput = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    // Recupera o contéudo do input de filtro das tasks
    listenerInputSearch = (event) => {

        const { name, value } = event.target;

        this.setState({
            [name]: value
        });

        this.props.setFilterText(value);
    }

    // Adiciona uma task na lista
    submitForm = () => {

        if (this.validator.validates(this.state)) {
            this.props.listenerSubmit(this.state);
            this.setState(this.stateInicial);
        }
    }

    render() {

        const { nome, search } = this.state;

        return (
            <form className="margin">
                <input
                    id="nome"
                    type="text"
                    name="nome"
                    value={nome}
                    onChange={this.listenerInput}
                    placeholder="Enter a task..."
                />
                <button onClick={this.submitForm}
                    type="button"
                    className="margin">ADD</button>
                <input
                    id="search"
                    type="text"
                    name="search"
                    value={search}
                    onChange={this.listenerInputSearch}
                    placeholder="Enter a task you want..."
                />
            </form >
        );
    }
}

export default Form;