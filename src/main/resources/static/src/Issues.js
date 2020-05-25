import React, { Component } from 'react';

//import Data from './sampleData';

import {
  Link
} from "react-router-dom";

class IssuesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      issues: []
    };
  }

  componentDidMount() {
    // prod
    fetch("../issues")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            issues: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: error
          });
        }
      )
    // dev
    //this.setState({ isLoaded: true, issues: Data });
  }

  render() {
    const { error, isLoaded, issues } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (! isLoaded) {
      return <div>Loading...</div>;
    } else {
        issues.sort((a, b) => (parseInt(a.count, 10) < parseInt(b.count, 10)) ? 1 : -1);
        return (
                      <div className="container-fluid">
                          <div className="row">
                            <div className="col-8 offset-2 text-left">
                              <h1>Listing</h1>
                            </div>
                           </div>
                          <div className="row">
                            <div className="col-8 offset-2 text-left">
                                  <table className="table">
                                    <thead>
                                        <tr className="text-left">
                                          <th scope="col">code</th>
                                          <th scope="col">message</th>
                                          <th scope="col">count</th>
                                        </tr>
                                     </thead>
                                     <tbody>
                                  {
                                   issues.map((issue, index) => {
                                      return (
                                        <tr className="text-left" key={index}>
                                          <td><pre><Link to={ `/issue/${issue.id}` }>{issue.shortId}</Link></pre></td>
                                          <td><pre>{issue.title}</pre></td>
                                          <td>{issue.count}</td>
                                        </tr>
                                      );
                                    })
                                  }
                                    </tbody>
                                  </table>
                            </div>
                           </div>
                      </div>
        );
    }
  }
}

export default IssuesComponent;