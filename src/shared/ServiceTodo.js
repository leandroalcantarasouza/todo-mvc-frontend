import {createAxiosRequest} from "./DefaultHttpRequestCreator";

class ServiceTodo {

  createTodo(todo) {
    return createAxiosRequest().post('/todos', {
      content: todo.getContent()
    })
  }

}

export default ServiceTodo;
