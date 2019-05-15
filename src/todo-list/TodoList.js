import React, {Component} from 'react';
import './TodoList.css';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import {Link, Route} from "react-router-dom";
import Row from "react-bootstrap/Row";
import NewTodoComponent from "../new-todo/NewTodoComponent";
import EditTodoComponent from "../edit-todo/EditTodoComponent";
import DeleteTodoComponent from "../delete-todo/DelTodoComponent";
import Moment from "react-moment";
import Form from "react-bootstrap/Form";
import queryString from 'query-string'
import ServiceTodo from "../shared/ServiceTodo";
import {FILTER_TODO_LOCAL_STORAGE, PAGE_SIZE_LOCAL_STORAGE} from "../shared/Constants";
import {setOnLocalStorage} from "../shared/LocalStorageService";


class TodoList extends Component {

  constructor(props) {
    super(props);
    this.match = this.props.match;
    this.history = this.props.history;
    this.location = this.props.location;
    const queryStringValues = queryString.parse(this.location.search);
    this.page = queryStringValues.page || 0;
    this.size = 10;
    this.serviceTodo = new ServiceTodo();
    let filterQuery = queryStringValues.contentFilter || "";
    this.state = {returnedTodo: [], filterQuery: filterQuery};
  };

  componentDidMount() {
    this.findByFilter();
  };

  componentWillReceiveProps(nextProps) {
    this.findByFilter();
  };

  findByFilter = () => {
    this.serviceTodo.findTodos(this.state.filterQuery, this.page, this.size)
      .then((response) => this.setState({
          returnedTodo: response.data.content
        })
      );
  };

  onSearchTodo = (event) => {
    if(event) {
      event.preventDefault();
    }

    let endpoint = "";
    if(this.state.filterQuery && this.state.filterQuery.trim() !== "") {
      endpoint += `contentFilter=${this.state.filterQuery}&`;
    }
    endpoint += `pageSize=${this.page}`;
    setOnLocalStorage(FILTER_TODO_LOCAL_STORAGE, this.state.filterQuery);
    setOnLocalStorage(PAGE_SIZE_LOCAL_STORAGE, this.page);
    return this.history.push(`/todo-list?${endpoint}`);
  };

  onChangeFilterValue = (event) => {
    this.setState({filterQuery: event.target.value});
  };

  render() {
    return(
      <div>
        <p/>
        <Form
          onSubmit={this.onSearchTodo}
          noValidate>
          <Row>
            <Col xs={1}>
              <Link to={{pathname:`${this.match.url}/new-todo`}}><i className={"fas fa-plus-circle fa-lg"} style={{fontSize: "2em"}}/></Link>
            </Col>
            <Col xs={11}>
              <Row>
                <Col xs={8}>
                  <Form.Control type="text" placeholder="Text Enter to Filter" value={this.state.filterQuery} onChange={this.onChangeFilterValue}/>
                </Col>
                <Col xs={4}>
                  <button type={"submit"}><i className={"fas fa-search"} style={{fontSize: "2em"}}/></button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
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
