import React, { Component } from 'react';
import './App.css';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import * as apiCalls from './api';


class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
        this.addTodo = this.addTodo.bind(this)
        // this.deleteTodo = this.deleteTodo.bind(this)
    }

    componentWillMount() {
        this.loadTodos();
    }

    async loadTodos() {
        let todos = await apiCalls.getTodos()
        this.setState({ todos })
    }
    async addTodo(val) {
        let newTodo = await apiCalls.createTodo(val)
        this.setState({ todos: [...this.state.todos, newTodo] })

    }
    async deleteTodo(id) {
        await apiCalls.removeTodo(id)
        const todos = this.state.todos.filter(todo => todo._id !== id)
        this.setState({ todos });
    }


    async toggleTodo(todo) {
        let updatedTodo = await apiCalls.updateTodo(todo)
        const todos = this.state.todos.map(todo =>
            (todo._id === updatedTodo._id)
                ? { ...todo, completed: !todo.completed }
                : todo
        )
        this.setState({ todos })

    }
    render() {
        const todos = this.state.todos.map((t) => (
            <TodoItem
                key={t._id}
                {...t}
                onDelete={this.deleteTodo.bind(this, t._id)}
                onToggle={this.toggleTodo.bind(this, t)}
            />
        ))
        return (
            <div>
                <h1>TodoList</h1>
                <TodoForm addTodo={this.addTodo} />
                {todos}
            </div >
        );
    }
}

export default TodoList;