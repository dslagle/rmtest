import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import numeral from "numeraljs";
import moment from "moment";

import { BASE_URL } from "../../../api-config";
import { FormatAsTimeSpanWithSeconds } from "../../actions/helpers";

class AdjustableAnalytics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            routematch: {
                byStop: {},
                byPoint: {}
            },
            google: {
                byStop: {},
                byPoint: {}
            },
            tmin: 0,
            tmax: 5,
            min: 0,
            max: 5,
            loading: false
        };
    }

    update(date, threshold, min, max) {
        this.setState({ ...this.state, min: min, max: max, loading: true });

        const url = `${BASE_URL}/analytics/eta/rangesummary?date=${date.valueOf()}&threshold=${threshold}&min=${min}&max=${max}`;
        Axios.get(url)
            .then(response => this.setState({ ...this.state, ...response.data, loading: false }))
            .catch(err => console.error(err));
    }

    commit() {
        this.update(this.props.activeDate, this.props.threshold, this.state.tmin, this.state.tmax);
    }

    componentWillMount() {
        const date = this.props.activeDate;
        const threshold = this.props.threshold;

        this.update(date, threshold, this.state.min, this.state.max);
    }

    componentWillReceiveProps(nextProps) {
        this.update(nextProps.activeDate, nextProps.threshold, this.state.min, this.state.max);
    }

    renderPercentSet(data) {
        return ([
            <td>{data.Total}</td>,
            <td>{numeral(data.PercentUnder).format("0%")}</td>,
            <td>{numeral(data.PercentOnTime).format("0%")}</td>,
            <td>{numeral(data.PercentOver).format("0%")}</td>
        ]);
    }

    renderValueSet(data) {
        return ([
            <td>{data.Total}</td>,
            <td>{FormatAsTimeSpanWithSeconds(data.AverageUnder)}</td>,
            <td>{FormatAsTimeSpanWithSeconds(data.AverageOver)}</td>,
            <td>{FormatAsTimeSpanWithSeconds(data.MaxUnder)}</td>,
            <td>{FormatAsTimeSpanWithSeconds(data.MaxOver)}</td>
        ]);
    }

    renderPercentSummary(data) {
        return ([
            <tr>
                <th rowSpan="1">By Stop</th>
                {this.renderPercentSet(data.routematch.byStop)}
                {this.renderPercentSet(data.google.byStop)}
            </tr>,
            <tr>
                <th rowSpan="1">By Point</th>
                {this.renderPercentSet(data.routematch.byPoint)}
                {this.renderPercentSet(data.google.byPoint)}
            </tr>
        ]);
    }

    renderValueSummary(data) {
        return ([
            <tr>
                <th rowSpan="1">By Stop</th>
                {this.renderValueSet(data.routematch.byStop)}
                {this.renderValueSet(data.google.byStop)}
            </tr>,
            <tr>
                <th rowSpan="1">By Point</th>
                {this.renderValueSet(data.routematch.byPoint)}
                {this.renderValueSet(data.google.byPoint)}
            </tr>
        ]);
    }

    renderPercentageTable() {
        return (
            <table className="summary-table alternate-rows-1 dark">
                <thead>
                    <tr>
                        <th colSpan="9">
                            <span>Analytics by Time to Next Stop: {`(${this.state.min}-${this.state.max}) Minutes`}</span>
                            <span className="header-input">
                                <span>Min: </span>
                                <input
                                    type="range"
                                    min="0"
                                    max="59"
                                    value={this.state.tmin}
                                    onChange={(e) => this.setState({ ...this.state, tmin: +e.target.value })}
                                />
                                <span> {this.state.tmin} Minutes</span>
                            </span>

                            <span className="header-input">
                                <span>Max: </span>
                                <input
                                    type="range"
                                    min="1"
                                    max="60"
                                    value={this.state.tmax}
                                    onChange={(e) => this.setState({ ...this.state, tmax: +e.target.value })}
                                />
                                <span> {this.state.tmax} Minutes</span>
                            </span>

                            <span className="header-input">
                                <button onClick={() => this.commit()}>Apply</button>
                            </span>

                            {this.state.loading ? <img src="/resources/default.svg" /> : null}
                        </th>
                    </tr>
                    <tr>
                        <th rowSpan="2">Type</th>
                        <th colSpan="4">Routematch</th>
                        <th colSpan="4">Google</th>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <th>% Under</th>
                        <th>% On-Time</th>
                        <th>% Over</th>
                        <th>Total</th>
                        <th>% Under</th>
                        <th>% On-Time</th>
                        <th>% Over</th>
                    </tr>
                    {this.renderPercentSummary.call(this, this.state)}
                </thead>
            </table>
        );
    }

    renderValueTable() {
        return (
            <table className="summary-table alternate-rows-1 dark">
                <thead>
                    <tr><th colSpan="11">Values</th></tr>
                    <tr>
                        <th rowSpan="2">Type</th>
                        <th colSpan="5">Routematch</th>
                        <th colSpan="5">Google</th>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <th>Avg. Under</th>
                        <th>Avg. Over</th>
                        <th>Max Under</th>
                        <th>Max Over</th>
                        <th>Total</th>
                        <th>Avg. Under</th>
                        <th>Avg. Over</th>
                        <th>Max Under</th>
                        <th>Max Over</th>
                    </tr>
                    {this.renderValueSummary.call(this, this.state)}
                </thead>
            </table>
        );
    }

    render() {
        return (
            <div className="adjustable-analytics">
                {this.renderPercentageTable.call(this)}
                {this.renderValueTable.call(this)}
            </div>
        )
    }


}

function mapStateToProps(state) {
    return {
        activeDate: state.activeDate,
        threshold: state.threshold
    };
}

module.exports = { AdjustableAnalytics: connect(mapStateToProps)(AdjustableAnalytics) };