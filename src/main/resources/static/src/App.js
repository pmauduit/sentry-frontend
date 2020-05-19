import React, { Component } from 'react';

import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Issues from './Issues';
import Issue from './Issue';
import Tag from './Tag';

import 'bootstrap/dist/js/bootstrap.js';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Back to list</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/issue/:id/tags/:tagKey" component={Tag} />
          <Route path="/issue/:id" component={Issue} />
          <Route path="/about">
              <div className="container-fluid">
                  <div className="row">
                    <div className="col-12 text-left">
                        <h1>About</h1>
                        <p><i>Just a frontend to sentry.IO</i></p>
                    </div>
                  </div>
              </div>
          </Route>
          <Route path="/">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 text-left">
                    <Issues />
                </div>
              </div>
            </div>
          </Route>
        </Switch>
      </div>
   </Router>
    );
  }
}

export default App;
