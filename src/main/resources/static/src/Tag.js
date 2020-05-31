/**
 * This component represents a single issue
 */

import React, { Component } from 'react';

import { PieChart } from 'react-minimal-pie-chart';

class TagComponent extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      tagData: {},
      tagKey: props.tagKey,
      issueId: props.issueId,
      chartMode: false
    };
  }

  loadTagValues() {
      const issueId = this.props.issueId;
      const tagKey = this.props.tagKey;
      fetch(`./issues/${issueId}/tags/${tagKey}`)
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

  toggleChartMode() {
    this.setState(state  => ({
        chartMode: ! this.state.chartMode
    }));
  }

  render() {
    const { tagKey, tagData, error, isLoaded, chartMode } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (! isLoaded) {
      return <div>Loading...</div>;
    } else {
        const colors = [ '#0275d890', '#5cb85c90', '#5bc0de90', '#f0ad4e90',
                        '#d9534f90', '#292b2c90', '#f7f7f790' ]
        const defaultLabelStyle = {
          fontSize: '2px',
          fontFamily: 'sans-serif',
        };
        const data = tagData.topValues.map((topValue, index) => {
          return {
            title: topValue.value,
            value: topValue.count,
            color: colors[index % colors.length ]

          }
        });

        return (
          <div>
                <h3>top values for { tagKey }</h3>
                <p className="text-right">
                  <button onClick={() => this.toggleChartMode()} className="btn btn-primary btn-sm">
                  { chartMode ? "Table" : "Chart" }
                  </button>
                </p>
                <hr className="my-4" />
                { ! chartMode &&
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
                }
                { chartMode &&
                   <PieChart
                     data={ data }
                     style={{ height: '500px' }}
                     label={({ dataEntry }) => `${dataEntry.title} (${dataEntry.value})` }
                     labelStyle={{
                               ...defaultLabelStyle,
                     }}
                   />
               }
          </div>
        );
    }
  }
}

export default TagComponent;
