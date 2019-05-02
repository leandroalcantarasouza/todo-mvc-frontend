import {createAxiosRequest} from "./DefaultHttpRequestCreator";
import axios from "axios";

class ServiceTodo {

  createTodo(todo) {
    return createAxiosRequest().post('/todos', {
      content: todo.getContent()
    })
  };

  findTodoById(idTodo) {
    return createAxiosRequest().get(`/todos/${idTodo}`);
  };

  deleteTodoById(idTodo) {
    return createAxiosRequest().delete(`/todos/${idTodo}`);
  };

  updateTodo(idTodo, todo) {
    return createAxiosRequest().patch(`/todos/${idTodo}`, {
      content: todo.getContent()
    })
  };

  findTodos(todoFilterQuery, todoPage, todoPageSize) {
    let endpoint = "/api/v1/todos?";
    if(todoFilterQuery && todoFilterQuery.trim() !== "") {
      endpoint += `contentFilter=${todoFilterQuery}&`;
    }
    endpoint += `page=${todoPage}&size=${todoPageSize}`;

    return axios.get(endpoint);
  }

}

export default ServiceTodo;
