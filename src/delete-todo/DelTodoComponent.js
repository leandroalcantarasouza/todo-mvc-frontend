import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React from "react";
import ServiceTodo from "../shared/ServiceTodo";
import Moment from "react-moment";


class DeleteTodoComponent extends React.Component {

  serviceTodo = new ServiceTodo();
  state = {todo: null};
  idTodo = this.props.match.params.idTodo;
  history = this.props.history;

  componentDidMount() {
    this.serviceTodo.findTodoById(this.idTodo).then(response => this.setState({todo: response.data}));
  }

  render() {
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
                  <button onClick={() => this.deleteTodo(this.idTodo, event)} className={"btn"}>
                    <i className={"far fa-thumbs-up"} style={{fontSize: "2em", color: "green"}}/>
                  </button>
                </Col>
                <Col>
                  <button onClick={this.exitTodo} className={"btn"}>
                    <i className={"far fa-thumbs-down"} style={{fontSize: "2em", color: "red"}}/>
                  </button>
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
    this.history.push("/todo-list");
  };

  deleteTodo = (idTodo, e) => {
    this.serviceTodo.deleteTodoById(idTodo)
      .then(this.exitTodo(e));
  }
}


export default DeleteTodoComponent;
