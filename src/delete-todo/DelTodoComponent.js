import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React from "react";
import ServiceTodo from "../shared/ServiceTodo";
import Moment from "react-moment";
import {getOnLocalStorage} from "../shared/LocalStorageService";
import {FILTER_TODO_LOCAL_STORAGE, PAGE_SIZE_LOCAL_STORAGE} from "../shared/Constants";
import {toast} from "react-toastify";
import styled from 'styled-components'
import Button from "react-bootstrap/Button";

class DeleteTodoComponent extends React.Component {

  serviceTodo = new ServiceTodo();
  state = {todo: null};
  idTodo = this.props.match.params.idTodo;
  history = this.props.history;

  componentDidMount() {
    this.serviceTodo.findTodoById(this.idTodo).then(response => this.setState({todo: response.data}));
  }

  render() {

    const ThumbUp = styled.i`
      font-size: 2em
      color: green
    `;

    const ThumbDown = styled.i`
      font-size: 2em
      color: red
    `;

    let delForm = "";
    const todo = this.state.todo;
    if(todo) {
      delForm = (
        <Container>
          <Modal show={true} centered={true} onHide={this.exitTodo}>
            <Modal.Header className={"bg-info"}>
              <Modal.Title className={"font-weight-light text-capitalize"} style={{color:"#fff"}}>Are You Sure You Want to Delete Todo ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  Id Todo
                </Col>
                <Col>
                  {todo.id}
                </Col>
              </Row>
              <Row>
                <Col>
                  Todo content
                </Col>
                <Col>
                  {todo.content}
                </Col>
              </Row>
              <Row>
                <Col>
                  Todo Last Update Date
                </Col>
                <Col>
                  <Moment format="DD/MM/YYYY">{todo.lastUpdateDate}</Moment>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer style={{justifyContent: "flex-start"}}>
              <Row>
                <Col>
                  <Button variant="link" onClick={() => this.deleteTodo(this.idTodo, event)}>
                    <ThumbUp className={"far fa-thumbs-up"}/>
                  </Button>
                </Col>
                <Col>
                  <Button variant="link" onClick={this.exitTodo}>
                    <ThumbDown className={"far fa-thumbs-down"}/>
                  </Button>
                </Col>
              </Row>
            </Modal.Footer>
          </Modal>
        </Container>
      );
    }
    return (
      delForm
    );
  };

  exitTodo = (e) => {
    if(e) {
      e.preventDefault();
    }
    let filterQuery = getOnLocalStorage(FILTER_TODO_LOCAL_STORAGE);
    let pageSize = getOnLocalStorage(PAGE_SIZE_LOCAL_STORAGE);
    let queryParam = "";
    if(filterQuery && pageSize) {
      queryParam += this.serviceTodo.mountTodoListQueryEndpoint(filterQuery, pageSize);
    }
    this.history.push(`/todo-list?${queryParam}`);
  };

  deleteTodo = (idTodo, e) => {
    this.serviceTodo.deleteTodoById(idTodo)
      .then(() => {
        toast.success("Todo deleted Successfully");
        this.exitTodo(e)
      });
  }
}


export default DeleteTodoComponent;
