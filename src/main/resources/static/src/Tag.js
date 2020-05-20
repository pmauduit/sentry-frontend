/**
 * This component represents a single issue
 */

import React, { Component } from 'react';

class TagComponent extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      tagData: {},
      tagKey: props.tagKey,
      issueId: props.issueId
    };
  }

  loadTagValues() {
      const issueId = this.props.issueId;
      const tagKey = this.props.tagKey;
      fetch(`../issues/${issueId}/tags/${tagKey}`)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              tagData: result,
              issueId: issueId,
              tagKey: tagKey
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error: error,
              issueId: issueId,
              tagKey: tagKey
            });
          }
        );
  }

  componentDidMount() {
    this.loadTagValues();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.tagKey !== prevProps.tagKey) {
        this.state = {
          error: null,
          isLoaded: false,
          tagData: {},
          tagKey: this.props.tagKey,
          issueId: this.props.issueId
        };
     this.loadTagValues();
     }
  }

  render() {
    const { tagKey, tagData, error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (! isLoaded) {
      return <div>Loading...</div>;
    } else {
        return (
          <div>
                <h3>top values for { tagKey }</h3>
                <hr className="my-4" />
                <table className="table">
                    <thead>
                        <tr className="text-left">
                            <th scope="col">value</th>
                            <th scope="col">count</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                       tagData.topValues.map((currentTag, index) => {
                          return (
                            <tr className="text-left" key={index}>
                              <td><pre>{ currentTag.value }</pre></td>
                              <td><pre>{ currentTag.count }</pre></td>
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

export default TagComponent;