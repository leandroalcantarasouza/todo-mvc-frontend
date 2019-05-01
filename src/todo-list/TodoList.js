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
          <Col xs={12}>
            <Link to={{pathname:`${this.match.url}/edit-todo`}}><i className={"fas fa-plus-circle fa-lg"}/>Edit Todo</Link>
          </Col>
        </Row>
        <ul className={"cardCollection"}>
          {this.state.returnedTodo.map((todo, index) => {
            return <li key={index}>
              <Card bg="info" text="white" style={{width: '18rem'}}>
                <Card.Body>
                  <Card.Text style={{align: "center"}}>
                    {todo.content}
                  </Card.Text>
                </Card.Body>
              </Card>
            </li>
          })
          }
        </ul>

        <Route path={`${this.match.url}/new-todo`} component={NewTodoComponent}/>
        <Route path={`${this.match.url}/edit-todo`} component={EditTodoComponent}/>
      </div>
    );
  }
}



export default TodoList;
