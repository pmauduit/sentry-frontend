import React, { Component } from 'react';
import Issues from './Issues';
import 'bootstrap/dist/js/bootstrap.js';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {
    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-12">
                  <div className="App">
                        <Issues />
                  </div>
            </div>
       </div>
   </div>
    );
  }
}

export default App;
