import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';
import './TodoContainer.css';
import Card from "react-bootstrap/Card";

class TodoContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {returnedTodo: []};
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
      <ul className={"cardCollection"}>
        {this.state.returnedTodo.map((todo, index) => {
          return <li>
            <Card bg="info" text="white" style={{ width: '18rem' }}>
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

    );
  }
}

export default TodoContainer;
