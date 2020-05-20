/**
 * This component represents a single issue
 */

import React, { Component } from 'react';

import Tag from './Tag';


//import Data from './sampleDataSingleIssue';

class IssueComponent extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      tagKey: null,
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
      );
  }

  loadTag(link) {
      console.log(link);
      //this.setState(state => ({
      //  tagKey: link.target.dataset.tagkey
      //}));
  }

  render() {
    const { error, isLoaded, issue, tagKey } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (! isLoaded) {
      return <div>Loading...</div>;
    } else {
        const tagItems = issue.tags.map((tag, index) => {
             return <li key={index}  onClick={e => this.loadTag(e)} className="stretched-link">{tag.key} ({tag.totalValues})</li>
        });
        return (
            <div className="container-fluid">
              <div className="row">
                            <div className="col-6 offset-2 text-left">
                                <h3><a href={issue.permalink} target="_blank">{ issue.title }</a></h3>
                                <hr className="my-4" />
                                <h3>Occurences</h3>
                                <ul>
                                    <li>Number of events: <pre>{ issue.count }</pre></li>
                                </ul>
                                <hr className="my-4" />
                                <h3>Logger</h3>
                                <p>{issue.logger}</p>
                                <hr className="my-4" />
                            </div>
              </div>
              <div className="row">
                    <div className="col-2 offset-2 text-left">
                          <h3>Tags:</h3>
                          <ul>
                          { tagItems }
                          </ul>
                    </div>
                    <div className="col-4 text-left">
                          { tagKey !== null ? <Tag tagKey={tagKey} issueId={ this.state.issueId } /> : <div/> }
                    </div>
              </div>
            </div>
        );
    }
  }
}

export default IssueComponent;