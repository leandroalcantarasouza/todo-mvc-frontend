import React from "react";
import FormTodoComponent from "../shared/FormTodoComponent";
import ServiceTodo from "../shared/ServiceTodo";
import TodoDTO from "../shared/TodoDTO";
import {getOnLocalStorage} from "../shared/LocalStorageService";
import {FILTER_TODO_LOCAL_STORAGE, PAGE_SIZE_LOCAL_STORAGE} from "../shared/Constants";
import {toast} from "react-toastify";
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
    this.serviceTodo.updateTodo(this.idTodo, todo).then(() => {
      toast.success("Todo updated Successfully");
      this.exitTodo()
    });
  }

  exitTodo = () => {
    let filterQuery = getOnLocalStorage(FILTER_TODO_LOCAL_STORAGE);
    let pageSize = getOnLocalStorage(PAGE_SIZE_LOCAL_STORAGE);
    let queryParam = "";
    if(filterQuery && pageSize) {
      queryParam += this.serviceTodo.mountTodoListQueryEndpoint(filterQuery, pageSize);
    }
    this.history.push(`/todo-list?${queryParam}`);
  };

}

export default NewTodoComponent;
