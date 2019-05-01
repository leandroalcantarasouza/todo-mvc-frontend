import {createAxiosRequest} from "./DefaultHttpRequestCreator";

class ServiceTodo {

  createTodo(todo) {
    return createAxiosRequest().post('/todos', {
      content: todo.getContent()
    })
  };

  findTodo(idTodo) {
    return createAxiosRequest().get(`/todos/${idTodo}`);
  };

  updateTodo(idTodo, todo) {
    return createAxiosRequest().patch(`/todos/${idTodo}`, {
      content: todo.getContent()
    })
  };

}

export default ServiceTodo;
