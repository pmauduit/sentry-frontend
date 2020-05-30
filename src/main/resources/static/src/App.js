import React, { Component } from 'react';

import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Issues from './Issues';
import Issue from './Issue';

import 'bootstrap/dist/js/bootstrap.js';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <img src="./assets/x-icon.jpg" width="32" height="32" alt="" />
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="navbar-brand ml-2" href="#">Sentry issues</a>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/issue/:id" component={Issue} >
          </Route>
          <Route path="/about">
              <div className="container-fluid">
                  <div className="row">
                    <div className="col-8 offset-2 text-left">
                        <h1>About</h1>
                        <p><i>A simple frontend to the platform datas gathered by sentry.IO</i></p>
                        <p><a href="https://sentry.io/organizations/camptocamp/projects/">sentry.io</a> gathers our logs
                        and merges the issues caught in its specific loggers into <i>units</i> called events. These events
                        are tagged in order to ease search and correlation between issues.</p>
                        <p>See below for a screenshot of the official web user interface:</p>

                        <center>
                          <img src="./assets/sentry-ui.png" alt="sentry UI" className="img-fluid" />
                        </center>

                        <p className="mt-4">We can see that 70 issues have been recorded in the <i>geo2france</i> project. Since we
                        sorted these issues by frequency, we can deduce that the most frequent one has been detected 6.3k
                        times - number of events - these last 14 days, from 19 different users.</p>
                        <p>Since we cannot provide an access to our sentry.io corporate account for our customers, we
                        developed this tool, in order to offer an access to the collected datas in an indirect way.</p>
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
