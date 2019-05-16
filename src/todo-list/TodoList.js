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
import Button from "react-bootstrap/Button";
import CardColumns from "react-bootstrap/CardColumns";


class TodoList extends Component {

  constructor(props) {
    super(props);
    this.match = this.props.match;
    this.history = this.props.history;
    this.location = this.props.location;
    const queryStringValues = queryString.parse(this.location.search);
    this.page = queryStringValues.page || 0;
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
    this.serviceTodo.findTodos(this.state.filterQuery, this.page)
      .then((response) => this.setState({
          returnedTodo: response.data.content
        })
      );
  };

  onSearchTodo = (event) => {
    if (event) {
      event.preventDefault();
    }

    let endpoint = "";
    endpoint += this.serviceTodo.mountTodoListQueryEndpoint(this.state.filterQuery, this.page);
    // if(this.state.filterQuery && this.state.filterQuery.trim() !== "") {
    //   endpoint += `contentFilter=${this.state.filterQuery}&`;
    // }
    // endpoint += `pageSize=${this.page}`;
    setOnLocalStorage(FILTER_TODO_LOCAL_STORAGE, this.state.filterQuery);
    setOnLocalStorage(PAGE_SIZE_LOCAL_STORAGE, this.page);
    return this.history.push(`/todo-list?${endpoint}`);
  };

  onChangeFilterValue = (event) => {
    this.setState({filterQuery: event.target.value});
  };

  render() {
    return (
      <div>
        <p/>
        <Form
          onSubmit={this.onSearchTodo}
          style={{marginBottom: "1em"}}
          noValidate>
          <Row>
            <Col xs={1}>
              <Link to={{pathname: `${this.match.url}/new-todo`}}><i className={"fas fa-plus-circle fa-lg"}
                                                                     style={{fontSize: "2em"}}/></Link>
            </Col>
            <Col xs={11}>
              <Row>
                <Col xs={8}>
                  <Form.Control type="text" placeholder="Text Enter to Filter" value={this.state.filterQuery}
                                onChange={this.onChangeFilterValue}/>
                </Col>
                <Col xs={4}>
                  <Button ts="input" type="submit" variant="link" className={"btn btn-link"}><i
                    className={"fas fa-search fa-lg"} style={{fontSize: "2em"}}/></Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
        <div className="row">
          {this.state.returnedTodo.map((todo, index) => {
            return <div className="col-sm-2">
              <div className="card-deck" style={{marginBottom: '15px'}}>
                <Card style={{width: '19em', height: '12em'}}>
                  <Card.Body>
                    <Card.Text className={"text-info text-center"}>
                        {todo.content}
                    </Card.Text>
                    <Card.Text className={"text-info text-center"}>
                      <div className={"text-center"}>
                        <Moment format="DD/MM/YYYY">{todo.lastUpdateDate}</Moment>
                      </div>
                    </Card.Text>
                    <Card.Footer style={{backgroundColor: "transparent", borderTop: "0px"}}>
                      <Row>
                        <Col>
                          <Link to={{pathname: `${this.match.url}/edit-todo/${todo.id}`}}><i
                            className={"fas fa-pen fa-lg"} style={{fontSize: '1.5em'}}/></Link>
                        </Col>
                        <Col>
                          <Link to={{pathname: `${this.match.url}/delete-todo/${todo.id}`}}><i
                            className={"fas fa-trash fa-lg"} style={{fontSize: '1.5em'}}/></Link>
                        </Col>
                      </Row>
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </div>
            </div>
          })
          }
        </div>
        <Route path={`${this.match.url}/new-todo`} component={NewTodoComponent}/>
        <Route path={`${this.match.url}/edit-todo/:idTodo`} component={EditTodoComponent}/>
        <Route path={`${this.match.url}/delete-todo/:idTodo`} component={DeleteTodoComponent}/>
      </div>
    );
  }
}


export default TodoList;
