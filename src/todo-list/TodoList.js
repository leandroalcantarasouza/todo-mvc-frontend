import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';
import './TodoList.css';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import {Link, Route} from "react-router-dom";
import Row from "react-bootstrap/Row";
import NewTodoComponent from "../new-todo/NewTodoComponent";
import EditTodoComponent from "../edit-todo/EditTodoComponent";
import DeleteTodoComponent from "../delete-todo/DelTodoComponent";
import Moment from "react-moment";


class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = {returnedTodo: []};
    this.match = this.props.match;
    console.log(this.match);
  };

  componentDidMount() {
    axios.get('/api/v1/todos?contentFilter=blah&page=0&size=10')
      .then((response) => this.setState({
          returnedTodo: response.data.content
        })
      );
  };


  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Link to={{pathname:`${this.match.url}/new-todo`}}><i className={"fas fa-plus-circle fa-lg"}/></Link>
          </Col>
        </Row>
        <ul className={"cardCollection"}>
          {this.state.returnedTodo.map((todo, index) => {
            return <li key={index}>
              <Card bg="info" text="white" style={{width: '18rem'}}>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Text style={{align: "center"}}>
                        {todo.content}
                      </Card.Text>
                    </Col>
                    <Col>
                      <Card.Text>
                        <Moment format="DD/MM/YYYY">{todo.lastUpdateDate}</Moment>
                      </Card.Text>
                    </Col>
                  </Row>
                  <Card.Footer className={"bg-none"}>
                    <Row>
                      <Col xs={6}>
                        <Link to={{pathname:`${this.match.url}/edit-todo/${todo.id}`}}><i className={"fas fa-pen fa-lg"}/></Link>
                      </Col>
                      <Col xs={6}>
                        <Link to={{pathname:`${this.match.url}/delete-todo/${todo.id}`}}><i className={"fas fa-trash fa-lg"}/></Link>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </li>
          })
          }
        </ul>

        <Route path={`${this.match.url}/new-todo`} component={NewTodoComponent}/>
        <Route path={`${this.match.url}/edit-todo/:idTodo`} component={EditTodoComponent}/>
        <Route path={`${this.match.url}/delete-todo/:idTodo`} component={DeleteTodoComponent}/>
      </div>
    );
  }
}



export default TodoList;
