import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import DatePicker from "react-datepicker";

import { setActiveDate, setThreshold } from "../../actions/index";

class Analytics extends Component {
    render() {
        return (
            <div className="analytics">
                <div className="analytics-options clearfix">
                    <div className="options">
                        <div>
                            <span>Date: </span>
                            <DatePicker
                                selected={this.props.activeDate}
                                autoFocus={false}
                                onChange={(d) => {
                                    this.props.setActiveDate(d);
                                }}
                            />
                        </div>
                        <div className="option-input">
                            <span>Threshold: </span>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={this.props.threshold}
                                onChange={(e) => this.props.setThreshold(+e.target.value)}
                            />
                            <span> {this.props.threshold} Minutes</span>
                        </div>
                    </div>
                    <div className="legend">
                        <div className="legend-item">
                            <span className="legend-color late" />
                            <span className="legend-text">Vehicle arrived {this.props.threshold} minutes later than predicted</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-color ontime" />
                            <span className="legend-text">Vehicle arrived within {this.props.threshold} minutes of predicted</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-color early" />
                            <span className="legend-text">Vehicle arrived {this.props.threshold} minutes earlier than predicted</span>
                        </div>
                    </div>
                </div>
                <div>{this.props.children}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeDate: state.activeDate,
        threshold: state.threshold
    }
}

module.exports = { Analytics: connect(mapStateToProps, { setActiveDate, setThreshold })(Analytics) };