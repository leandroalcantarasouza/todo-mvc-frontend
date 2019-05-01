import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React from "react";
import ServiceTodo from "../shared/ServiceTodo";


class DeleteTodoComponent extends React.Component {

  constructor(props) {
    super(props);
    this.idTodo = props.match.params.idTodo;
    this.history = this.props.history;
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  render() {
    return (
      <Container>
        <Modal show={true} centered={true} onHide={this.exitTodo}>
          <Modal.Header className={"bg-info"}>
            <Modal.Title className={"font-weight-light text-capitalize"} style={{color:"#fff"}}>Are You Sure You Want to Delete Todo ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <label placeholder="Content">{this.idTodo}</label>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer style={{justifyContent: "flex-start"}}>
            <Row>
              <Col>
                <button onClick={() => this.deleteTodo(this.idTodo)} className={"btn"}>
                  <i className={"far fa-thumbs-up"} style={{fontSize: "2em", color: "green"}}/>
                </button>
              </Col>
              <Col >
                <button onClick={this.exitTodo} className={"btn"}>
                  <i className={"far fa-thumbs-down"} style={{fontSize: "2em", color: "red"}}/>
                </button>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  };

  exitTodo = () => {
    this.history.goBack();
  };

  deleteTodo(idTodo) {
    const serviceTodo = new ServiceTodo();
    serviceTodo.deleteTodoById(idTodo)
      .then(this.exitTodo());
  }
}


export default DeleteTodoComponent;
