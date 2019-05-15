import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import TodoList from "./todo-list/TodoList";
import {ToastContainer} from "react-toastify";
import Container from "react-bootstrap/Container";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Container fluid={true}>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnVisibilityChange
        draggable={false}
        pauseOnHover
      />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={()=> {
            return <Redirect to={"/todo-list"}/>
          }}/>
          <Route path="/todo-list" component={TodoList}/>
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;

