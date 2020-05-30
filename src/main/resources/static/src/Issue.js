/**
 * This component represents a single issue
 */

import React, { Component } from 'react';

import {  XYPlot,
          YAxis,
          HorizontalGridLines,
          VerticalBarSeries
} from 'react-vis';

import {
  Link
} from "react-router-dom";

import Tag from './Tag';

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

  loadTag(clickedTag) {
      this.setState(state => ({
        tagKey: clickedTag.key
      }));
  }

  render() {
    const { error, isLoaded, issue, tagKey } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (! isLoaded) {
      return <div>Loading...</div>;
    } else {
        const tagItems = issue.tags.map((tag, index) => {
               const t = tag;
               return <li key={index} className="my-2">
                    <button className="btn btn-primary btn-block" onClick={() => this.loadTag(t)}>
                        {t.key} ({t.totalValues})
                    </button>
               </li>
        });
        const data24hours = issue.stats['24h'].map((item) => {
          return { x: item[0], y: item[1] };
        });
        const data30days = issue.stats['30d'].map((item) => {
          return { x: item[0], y: item[1] };
        });
        return (
            <div className="container-fluid">
              <div className="row">
                <div className="col-6 offset-2 text-left">
                    <Link className="nav-link text-danger" to="/">Back to list</Link>
                    <hr className="my-4" />
                    <h3>Issue title</h3>
                    <p className="text-center"><i>"{ issue.title }"</i></p>
                    <hr className="my-4" />
                    <h3>Occurences</h3>
                        <p>Number of events: <code><b>{ issue.count }</b></code></p>
                    <hr className="my-4" />
                    <h3>Events frequency</h3>
                    <h4>Past 24 hours</h4>
                      <center>
                        <XYPlot height={100} width={600}  xType="ordinal">
                           <YAxis style={{ text: { fontSize: "8px" } }} />
                           <HorizontalGridLines style={{ strokeWidth: 0.4, stroke: "#444" }} />
                           <VerticalBarSeries data={data24hours} color="#28a745" />
                        </XYPlot>
                      </center>
                    <h4>Past 30 days</h4>
                      <center>
                        <XYPlot height={100} width={600}  xType="ordinal">
                           <YAxis style={{ text: { fontSize: "8px" } }} />
                           <HorizontalGridLines style={{ strokeWidth: 0.4, stroke: "#444" }} />
                           <VerticalBarSeries data={data30days} color="#28a745" />
                        </XYPlot>
                      </center>
                    <hr className="my-4" />
                    <h3>Logger</h3>
                    <p>{issue.logger}</p>
                    <hr className="my-4" />
                </div>
              </div>
              <div className="row">
                    <div className="col-2 offset-2 text-left">
                          <h3>Tags:</h3>
                          <ul className="list-unstyled">
                          { tagItems }
                          </ul>
                    </div>
                     <div id="tagPlaceholder" className="col-4 text-left">
                    {
                        tagKey !== null ? <Tag tagKey={tagKey} issueId={issue.id} /> : <div/>
                    }
                    </div>
              </div>
            </div>
        );
    }
  }
}

export default IssueComponent;
