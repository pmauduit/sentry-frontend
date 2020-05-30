import React, { Component } from 'react';

import {
  Link
} from "react-router-dom";

class IssuesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      issues: [],
      sortBy: 'frequency'
    };
  }

  componentDidMount() {
    fetch("./issues")
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
  }

  toggleSort(event) {
    this.setState({
      sortBy: event.target.value
    })
  }

  render() {
    const { error, isLoaded, issues, sortBy } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (! isLoaded) {
      return <div>Loading...</div>;
    } else {
        if (sortBy === 'frequency') {
            issues.sort((a, b) => (parseInt(a.count, 10) < parseInt(b.count, 10)) ? 1 : -1);
        } else if (sortBy === 'frequency-invert') {
            issues.sort((a, b) => (parseInt(a.count, 10) > parseInt(b.count, 10)) ? 1 : -1);
        } else if (sortBy === 'date') {
            issues.sort((a, b) => ((new Date(a.lastSeen) < new Date(b.lastSeen)) ? 1: -1));
        } else if (sortBy === 'date-invert') {
            issues.sort((a, b) => ((new Date(a.lastSeen) > new Date(b.lastSeen)) ? 1: -1));
        }
        return (
                      <div className="container-fluid">
                          <div className="row">
                            <div className="col-8 offset-2 text-left">
                              <h1>Listing</h1>
                              <span className="float-right">
                                  <label for="toggleSort" className="mr-2">Sort by: </label>
                                  <select id="toggleSort" name="toggleSort" onChange={(event) => this.toggleSort(event)}>
                                      <option value="frequency">Frequency (most frequent first)</option>
                                      <option value="frequency-invert">Frequency (least frequent first)</option>
                                      <option value="date">Date (most recently seen first)</option>
                                      <option value="date-invert">Date (least recently seen first)</option>
                                  </select>
                              </span>
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