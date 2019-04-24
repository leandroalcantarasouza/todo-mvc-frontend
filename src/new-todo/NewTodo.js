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
  };


  createTodo(event) {
    event.preventDefault();
    let serviceTodo = new ServiceTodo();
    serviceTodo.createTodo(this.state.todo).then((response) => console.log(response));
    this.back();
  }

  onchangeTodo(event) {
    this.todoDto.content = event.target.value;
    this.setState({todo: this.todoDto})
  }

  back = (e) => {
    if(e) {
      e.preventDefault();
    }
    this.history.goBack();
  };

  render() {
    return (
      <Container>
        <Modal show={true} onHide={this.back} centered={true}>
          <Modal.Header className={"bg-info"}>
            <Modal.Title className={"font-weight-light text-capitalize"} style={{color:"#fff"}}>New Todo</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.createTodo}>
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
                    <button type={"submit"} className={"btn"}><i className={"far fa-thumbs-up"} style={{fontSize: "2em", color: "green"}}/></button>
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
