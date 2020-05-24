/**
 * This component calls canvasjs to render a pie chart
 * representing where the issue has been encountered.
 */

import React, { Component } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

class IssueEnv extends Component {

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

  loadEnvironmentData() {
      const issueId = this.props.issueId;
      fetch(`../issues/${issueId}/tags/environment`)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              tagData: result,
              issueId: issueId
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error: error,
              issueId: issueId
            });
          }
        );
  }

  componentDidMount() {
    this.loadEnvironmentData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.issueId !== prevProps.issueId) {
        this.state = {
          error: null,
          isLoaded: false,
          tagData: {},
          issueId: this.props.issueId
        };
     this.loadEnvironmentData();
     }
  }

  render() {
    const { tagData, error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (! isLoaded) {
      return <div>Loading...</div>;
    } else {
        const colors = [ '#0275d890', '#5cb85c90', '#5bc0de90', '#f0ad4e90',
                        '#d9534f90', '#292b2c90', '#f7f7f790' ]
        const defaultLabelStyle = {
          fontSize: '6px',
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
          <div className="col-4">
           <PieChart
             data={ data }
             style={{ height: '200px' }}
             radius={PieChart.defaultProps.radius - 10 }
             segmentsShift={(index) => (index === 0 ? 10 : 5)}
             label={({ dataEntry }) => `${dataEntry.title} (${dataEntry.value})` }
             labelStyle={{
                       ...defaultLabelStyle,
             }}
           />
          </div>
        );
    }
  }
}

export default IssueEnv;