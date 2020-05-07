import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Navigation from "./Components/Navigation";
import Home from "./Components/Home";
import ListAll from "./Components/ListAll";
import New from "./Components/New";
import Edit from "./Components/Edit";

function App() {
  return (
    <Router>
      <div className='text-center'>
        <Navigation />
        <div className='p-3'>
          <Switch>
            <Route path='/all' excact component={ListAll} />
            <Route path='/new' exact component={New} />
            <Route path='/edit/:id' component={Edit} />
            <Route path='/' component={Home} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
