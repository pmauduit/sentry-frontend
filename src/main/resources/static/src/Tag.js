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
      tagKey: props.tagKey
    };
  }

  componentDidMount() {
    const issueId = this.state.issueId;
    const tagKey = this.state.tagKey;

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
                <h1>Tag { tagKey }</h1>
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