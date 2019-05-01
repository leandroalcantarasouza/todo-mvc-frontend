import ServiceTodo from "../shared/ServiceTodo";
import React from "react";
import FormTodoComponent from "../shared/FormTodoComponent";
import TodoDTO from "../shared/TodoDTO";

class NewTodoComponent extends React.Component {

  constructor({history}) {
    super(history);
    this.history = history;
    this.saveTodo = this.saveTodo.bind(this);
  }

  render() {
    return (
      <FormTodoComponent label={"New Todo"} todoDto={new TodoDTO()} onFormSubmit={this.saveTodo} onClose={this.exitTodo}/>
    );
  }

  saveTodo(todo) {
    const serviceTodo = new ServiceTodo();
    serviceTodo.createTodo(todo).then(() => this.exitTodo());
  }

  exitTodo = () => {
    this.history.goBack();
  };

}

export default NewTodoComponent;
