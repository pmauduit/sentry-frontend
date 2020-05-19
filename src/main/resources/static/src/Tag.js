/**
 * This component represents a single issue
 */

import React, { Component } from 'react';

import {
  Link
} from "react-router-dom";

//import Data from './sampleDataSingleIssueTag';

class TagComponent extends Component {
  
  constructor(props) {

    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      tagData: {},
      issueId: this.props.match.params.id,
      tagKey: this.props.match.params.tagKey
    };
  }

  componentDidMount() {
    const issueId = this.state.issueId;
    const tagKey = this.state.tagKey;
    //prod

    fetch(`../issues/${issueId}/tags/${tagKey}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            tagData: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: error,
          });
        }
      )
    //dev
    //this.setState({ isLoaded: true, tagData: Data });
  }

  render() {
    const { tagKey, tagData, issueId, error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (! isLoaded) {
      return <div>Loading...</div>;
    } else {
        return (
          <div className="container-fluid">
              <div className="row">
                    <div className="col-12 text-left">
                        <h1>Tag { tagKey }</h1>
                        <hr class="my-4" />
                        <table className="table">
                            <thead>
                                <tr className="text-left">
                                    <th scope="col">value</th>
                                    <th scope="col">count</th>
                                </tr>
                            </thead>
                            <tbody>
                              {
                               tagData.topValues.map((currentTag) => {
                                  return (
                                    <tr className="text-left">
                                      <td><pre>{ currentTag.value }</pre></td>
                                      <td><pre>{ currentTag.count }</pre></td>
                                    </tr>
                                  );
                                })
                              }
                            </tbody>
                        </table>
                        <Link to={ `/issue/${issueId}` }>back to issue details</Link>
                    </div>
              </div>
          </div>
        );
    }
  }
}

export default TagComponent;