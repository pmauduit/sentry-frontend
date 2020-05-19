/**
 * This component represents a single issue
 */

import React, { Component } from 'react';

import {
  Link
} from "react-router-dom";

//import Data from './sampleDataSingleIssue';

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
    //this.setState({ isLoaded: true, issue: Data });
  }

  render() {
    const { error, isLoaded, issue, _ } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (! isLoaded) {
      return <div>Loading...</div>;
    } else {
        return (
          <div className="container-fluid">
              <div className="row">
                    <div className="col-12 text-left">
                          <h3><a href={issue.permalink} target="_blank">{ issue.title }</a></h3>
                          <hr class="my-4" />
                          <h3>Versions</h3>
                          <ul>
                              <li>first release version: <pre>v{ issue.firstRelease.version }</pre></li>
                              <li>last release version: <pre>v{ issue.lastRelease.version }</pre></li>
                          </ul>
                           <hr class="my-4" />
                          <h3>Logger</h3>
                          <p>{issue.logger}</p>
                          <hr class="my-4" />
                          <h3>Tags:</h3>
                          <ul>
                              {
                               issue.tags.map((tag, index) => {
                                  return (
                                      <li><Link to={ `/issue/${issue.id}/tags/${tag.key}` }>{tag.key} ({tag.totalValues})</Link></li>
                                  );
                                })
                              }
                          </ul>
                          <hr class="my-4" />
                    </div>
              </div>
        </div>
        );
    }
  }
}

export default IssueComponent;