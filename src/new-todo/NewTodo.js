import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ServiceTodo from "../shared/ServiceTodo";
import TodoDTO from "../shared/TodoDTO";
import Container from "react-bootstrap/Container";

class NewTodo extends Component {

  constructor(props) {
    super(props);
    this.match = this.props.match;
    this.history = this.props.history;
    this.createTodo = this.createTodo.bind(this);
    this.onchangeTodo = this.onchangeTodo.bind(this);
    this.todoDto = new TodoDTO();
    this.state = {todo: this.todoDto};
    this.disabled = true;
  };

  createTodo(event) {
    event.preventDefault();
    let serviceTodo = new ServiceTodo();
    serviceTodo.createTodo(this.state.todo).then((response) => console.log(response));
    this.back();
  };

  onchangeTodo(event) {
    this.todoDto.content = event.target.value;
    let contentTrimmed = this.todoDto.content && this.todoDto.content.trim();
    if(contentTrimmed !== "") {
      this.disabled = false;
    }
    else {
      this.disabled = true;
    }
    this.setState({todo: this.todoDto})
  };

  back = (e) => {
    if(e) {
      e.preventDefault();
    }
    this.history.goBack();
  };

  disableSubmitOnEmptyForm = (event) => {
    if(event) {
      let pressedValue = event.charCode || event.keyCode;
      if(pressedValue === 13 && this.state.todo.content.trim() === "") {
        event.preventDefault();
        return false;
      }
    }
  };

  render() {
    return (
      <Container>
        <Modal show={true} onHide={this.back} centered={true}>
          <Modal.Header className={"bg-info"}>
            <Modal.Title className={"font-weight-light text-capitalize"} style={{color:"#fff"}}>New Todo</Modal.Title>
          </Modal.Header>
          <Form onKeyPress={this.disableSubmitOnEmptyForm} >
            <Modal.Body>
                <Row>
                  <Col>
                    <Form.Control placeholder="Content" value={this.state.todo.content} onChange={this.onchangeTodo}/>
                  </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer style={{justifyContent: "flex-start"}}>
              <Row>
                <Col>
                  <button onClick={this.createTodo} disabled={this.disabled} type={"submit"} className={"btn"}>
                    <i className={"far fa-thumbs-up"} style={{fontSize: "2em", color: "green"}}/>
                  </button>
                </Col>
                <Col >
                  <button onClick={this.back} className={"btn"}><i className={"far fa-thumbs-down"} style={{fontSize: "2em", color: "red"}}/></button>
                </Col>
              </Row>
            </Modal.Footer>
          </Form>
        </Modal>
        </Container>
    );
  }
}

export default NewTodo;
