/**
 * This component represents a single issue
 */

import React, { Component } from 'react';

import {  XYPlot,
          YAxis,
          HorizontalGridLines,
          VerticalBarSeries,
          Hint,
          MarkSeries
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
      tagCloudValue: null,
      tagCloudData : [],
      issueId: this.props.match.params.id
    };
  }

  componentDidMount() {
    const issueId = this.state.issueId;

    fetch(`./issues/${issueId}`)
      .then(res => res.json())
      .then(
        (result) => {
          const tagCloudData = result.tags.map((tag, index) => {
            return { x: index,
                     y: Math.floor(Math.random() * Math.floor(10)),
                     size: tag.totalValues,
                     name: tag.key };
          });
          this.setState({
            isLoaded: true,
            issue: result,
            tagCloudData: tagCloudData
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

  unloadTag() {
     this.setState(state => ({
        tagKey: null
     }));
  }

  setTagCloudValue(value) {
    this.setState(state => ({
      tagCloudValue: value
    }));
  }

  render() {
    const { error, isLoaded, issue, tagKey, tagCloudValue, tagCloudData } = this.state;
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
                <div className="col-8 offset-2 text-left">
                    <div className="float-right">
                        <Link className="nav-link" to="/">
                            <button className="btn btn-outline-danger btn-sm">Back to list</button>
                        </Link>
                    </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8 offset-2 text-left">
                    <h1 className="text-center">"{ issue.title }"</h1>
                    <hr className="my-4" />

                    <h3>Occurences</h3>
                    <ul>
                      <li>Number of events: <code><b>{ issue.count }</b></code></li>
                      <li>Number of events due to a user interaction: <code><b>{ issue.userCount }</b></code></li>
                    </ul>
                    <hr className="my-4" />
                    <h3>Events frequency</h3>
                    <ul>
                        <li>First seen: <code><b>{ issue.firstSeen }</b></code></li>
                        <li>Last seen: <code><b>{ issue.lastSeen }</b></code></li>
                    </ul>
                    <hr className="my-4" />
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
                        tagKey !== null ?
                                <div>
                                    <span className="float-right">
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => this.unloadTag()}>Close</button>
                                    </span>
                                    <Tag tagKey={tagKey} issueId={issue.id} />
                                </div>
                                :
                                <div>
                                    <h3>Tag cloud</h3>
                                    <XYPlot width={800} height={400} animation={ true }
                                              onMouseLeave={(value) => { this.setTagCloudValue(null) }}
                                    >
                                      <MarkSeries strokeWidth={2} opacity="0.8" sizeRange={[5, 15]}
                                        data={ tagCloudData }
                                        color="#28a745"
                                        onNearestXY={(value) => { this.setTagCloudValue(value)}}
                                        onValueClick={(value) => { this.loadTag({key: value.name})}}
                                      />
                                      {tagCloudValue ? <Hint value={tagCloudValue}>
                                        <div className="border sticky-top p-2" style={{ backgroundColor: "white" }}>
                                          <h3>{tagCloudValue.name}</h3>
                                          <p>Appears on <code><b>{tagCloudValue.size}</b></code> events</p>
                                        </div>
                                      </Hint> : null }
                                    </XYPlot>
                                </div>
                    }
                    </div>
              </div>
            </div>
        );
    }
  }
}

export default IssueComponent;
