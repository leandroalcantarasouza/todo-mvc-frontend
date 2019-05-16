import {createAxiosRequest} from "./DefaultHttpRequestCreator";

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

  findTodos(todoFilterQuery, pageSize) {
    let endpoint = "/todos?";
    endpoint += this.mountTodoListQueryEndpoint(todoFilterQuery, pageSize);
    return createAxiosRequest().get(endpoint);
  }

  mountTodoListQueryEndpoint(contentFilter, pageSize) {
    let endpoint = "";
    if (contentFilter && contentFilter.trim() !== "") {
      endpoint += `contentFilter=${contentFilter}&`;
    }
    endpoint += `pageSize=${pageSize}`;
    return endpoint;
  }

}

export default ServiceTodo;
