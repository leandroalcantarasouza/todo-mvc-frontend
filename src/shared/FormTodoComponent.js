import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

class FormTodoComponent extends Component {

  constructor({label, todoDto, onFormSubmit, onClose}) {
    super(label, todoDto, onFormSubmit, onClose);
    this.label = label;
    this.todoDto = todoDto;
    this._onFormSubmit = onFormSubmit;
    this._onClose = onClose;
    this.submitTodo = this.submitTodo.bind(this);
    this.onchangeTodo = this.onchangeTodo.bind(this);
    this.state = {todo: this.todoDto, disabled: true, validated: false};
  };

  submitTodo(event) {
    event.preventDefault();
    event.stopPropagation();
    if(this.state.todo && this.state.todo.content.trim() !== "") {
      this._onFormSubmit(this.todoDto);
    } else {
      this.setState({validated: true});
    }
  };

  onchangeTodo(event) {
    this.todoDto.content = event.target.value;
    let contentTrimmed = this.todoDto.content && this.todoDto.content.trim();
    if(contentTrimmed !== "") {
      this.setState({disabled:false});
    }
    else {
      this.setState({disabled:true});
    }
    this.setState({todo: this.todoDto})
  };

  back = (e) => {
    if(e) {
      e.preventDefault();
    }
    this._onClose();
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
    const label = this.label;
    const todoDto = this.state.todo;
    return (
      <Container>
        <Modal show={true} onHide={this.back} centered={true}>
          <Modal.Header className={"bg-info"}>
            <Modal.Title className={"font-weight-light text-capitalize"} style={{color:"#fff"}}>{label}</Modal.Title>
          </Modal.Header>
          <Form onKeyPress={this.disableSubmitOnEmptyForm}
                onSubmit={this.submitTodo}
                noValidate
                validated={this.state.validated}>
            <Modal.Body>
                <Form.Row>
                  <Form.Group as={Col} md="12">
                    <Form.Control required placeholder="Content" type="text" value={todoDto.content} onChange={this.onchangeTodo}/>
                    <Form.Control.Feedback type="invalid">A content must be inserted</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
            </Modal.Body>
            <Modal.Footer style={{justifyContent: "flex-start"}}>
              <Row>
                <Col>
                  <Button variant={"link"} disabled={this.state.disabled} type={"submit"}>
                    <i className={"far fa-thumbs-up"} style={{fontSize: "2em", color: "green"}}/>
                  </Button>
                </Col>
                <Col >
                  <Button variant={"link"} onClick={this.back}>
                    <i className={"far fa-thumbs-down"} style={{fontSize: "2em", color: "red"}}/>
                  </Button>
                </Col>
              </Row>
            </Modal.Footer>
          </Form>
        </Modal>
        </Container>
    );
  }
}

export default FormTodoComponent;
