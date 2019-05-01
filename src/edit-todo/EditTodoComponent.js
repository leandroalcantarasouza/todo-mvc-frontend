import React from "react";
import FormTodoComponent from "../shared/FormTodoComponent";
import ServiceTodo from "../shared/ServiceTodo";
import TodoDTO from "../shared/TodoDTO";

class NewTodoComponent extends React.Component {

  constructor({history}) {
    super(history);
    this.history = history;
    this.editTodo = this.editTodo.bind(this);
    this.serviceTodo = new ServiceTodo();
    this.state = {todo: null}
  }

  componentDidMount() {
    this.serviceTodo.findTodo("5cc9fd687c714c329f7aa5ae").then(response => this.setState({todo: new TodoDTO(response.data.content)}));
  }

  render() {
    let todoForm = "";
    if(this.state.todo) {
      todoForm = <FormTodoComponent label={"Edit Todo"} todoDto={this.state.todo} onActionTodo={this.editTodo} onExitTodo={this.exitTodo}/>;;
    }
    return (
      todoForm
    );
  }

  editTodo(todo) {
    this.serviceTodo.updateTodo("5cc9fd687c714c329f7aa5ae", todo).then(() => this.exitTodo());
  }

  exitTodo = () => {
    this.history.goBack();
  };

}

export default NewTodoComponent;
