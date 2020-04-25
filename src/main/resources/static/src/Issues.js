import React, { Component } from 'react';

//import Data from './sampleData';

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
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, issues } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (! isLoaded) {
      return <div>Loading...</div>;
    } else {
        issues.sort((a, b) => (parseInt(a.count) < parseInt(b.count)) ? 1 : -1);
        return (
            <div className="issues">
              <table className="table">
                <thead>
                    <tr className="text-left">
                      <th scope="col">#</th>
                      <th scope="col">code</th>
                      <th scope="col">message</th>
                      <th scope="col">count</th>
                    </tr>
                 </thead>
                 <tbody>
              {
               issues.map((issue, index) => {
                  return (
                    <tr className="text-left">
                      <th scope="row">{index}</th>
                      <td><pre>{issue.shortId}</pre></td>
                      <td><pre>{issue.title}</pre></td>
                      <td>{issue.count}</td>
                    </tr>
                  );
                })
              }
                </tbody>
              </table>
            </div>
        );
    }
  }
}

export default IssuesComponent;