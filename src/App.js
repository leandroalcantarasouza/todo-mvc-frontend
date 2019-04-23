import {BrowserRouter, Route} from "react-router-dom";
import TodoContainer from "./container/TodoContainer";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <BrowserRouter>
        <Route path="/" exact component={TodoContainer} />
        {/*<Route path="/about/" component={About} />*/}
        {/*<Route path="/users/" component={Users} />*/}
    </BrowserRouter>
  );
}

export default App;
