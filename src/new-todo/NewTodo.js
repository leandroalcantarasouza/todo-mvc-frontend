import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class NewTodo extends Component {

  constructor(props) {
    super(props);
    this.match = this.props.match;
    this.history = this.props.history;
  };

  componentDidMount() {
  };

  back = (e) => {
    this.history.goBack();
  };

  render() {
    return (
      <Modal show={true} onHide={this.back}>
        <Modal.Header>
          <Modal.Title>New Todo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Control placeholder="Content" />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.back}>Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default NewTodo;
