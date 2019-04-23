import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import TodoList from "./todo-list/TodoList";
import {Redirect} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={()=> {
          return <Redirect to={"/todo-list"}/>
        }}/>
        <Route path="/todo-list" component={TodoList}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

