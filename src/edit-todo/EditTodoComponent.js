import React from "react";
import FormTodoComponent from "../shared/FormTodoComponent";
import ServiceTodo from "../shared/ServiceTodo";
import TodoDTO from "../shared/TodoDTO";

class NewTodoComponent extends React.Component {

  constructor({history, match}) {
    super(history, match);
    this.history = history;
    this.idTodo = match.params.idTodo;
    this.editTodo = this.editTodo.bind(this);
    this.serviceTodo = new ServiceTodo();
    this.state = {todo: null}
  }

  componentDidMount() {
    this.serviceTodo.findTodoById(this.idTodo).then(response => this.setState({todo: new TodoDTO(response.data.content)}));
  }

  render() {
    let todoForm = "";
    if(this.state.todo) {
      todoForm = <FormTodoComponent label={"Edit Todo"} todoDto={this.state.todo} onFormSubmit={this.editTodo} onClose={this.exitTodo}/>;;
    }
    return (
      todoForm
    );
  }

  editTodo(todo) {
    this.serviceTodo.updateTodo(this.idTodo, todo).then(() => this.exitTodo());
  }

  exitTodo = () => {
    this.history.goBack();
  };

}

export default NewTodoComponent;
