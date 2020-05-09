/**
 * This component represents a single issue
 */

import React, { Component } from 'react';

import {
  useParams
} from "react-router-dom";


// import Data from './sampleDataSingleIssue';

class IssueComponent extends Component {
  
  constructor(props) {

    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      issue: {},
      issueId: this.props.match.params.id
    };
  }

  componentDidMount() {
    const issueId = this.state.issueId;
    //prod
    fetch(`../issues/${issueId}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            issue: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      )
    //dev
    //    this.setState({ isLoaded: true, issue: Data });
  }

  render() {
    const { error, isLoaded, issue, issueId } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (! isLoaded) {
      return <div>Loading...</div>;
    } else {
        return (
          <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="App">
                <div className="issue">
                  <h1>{ issue.title }</h1>
                  <p>Title: { issue.title }</p>
                  <p>Issue short Id: <a href={issue.permalink} target="_blank">{ issue.shortId }</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
    }
  }
}

export default IssueComponent;