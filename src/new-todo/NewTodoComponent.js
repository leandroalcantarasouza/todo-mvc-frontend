import ServiceTodo from "../shared/ServiceTodo";
import React from "react";
import FormTodoComponent from "../shared/FormTodoComponent";
import TodoDTO from "../shared/TodoDTO";
import {getOnLocalStorage} from "../shared/LocalStorageService";
import {FILTER_TODO_LOCAL_STORAGE, PAGE_SIZE_LOCAL_STORAGE} from "../shared/Constants";
import {toast} from "react-toastify";


class NewTodoComponent extends React.Component {

  constructor({history}) {
    super(history);
    this.history = history;
    this.saveTodo = this.saveTodo.bind(this);
    this.serviceTodo = new ServiceTodo();
  }

  render() {
    return (
      <FormTodoComponent label={"New Todo"} todoDto={new TodoDTO()} onFormSubmit={this.saveTodo} onClose={this.exitTodo}/>
    );
  }

  saveTodo(todo) {
    const serviceTodo = new ServiceTodo();
    serviceTodo.createTodo(todo).then(() => {
      toast.success("Todo saved Successfully");
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
