import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import numeral from "numeraljs";
import moment from "moment";

import { BASE_URL } from "../../../api-config";
import { FormatAsTimeSpanWithSeconds } from "../../actions/helpers";
import { AdjustableAnalytics } from "./adjustable-summary";

class AnalyticsSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            10: {
                routematch: {
                    byStop: {},
                    byPoint: {}
                },
                google: {
                    byStop: {},
                    byPoint: {}
                }
            },
            30: {
                routematch: {
                    byStop: {},
                    byPoint: {}
                },
                google: {
                    byStop: {},
                    byPoint: {}
                }
            }
        };
    }

    update(date, threshold) {
        const url = `${BASE_URL}/analytics/eta/summary?date=${date.valueOf()}&${threshold ? `threshold=${threshold}` : ''}`;
        Axios.get(url)
            .then(response => this.setState(response.data))
            .catch(err => console.error(err));
    }

    componentWillMount() {
        const date = this.props.activeDate;
        const threshold = this.props.threshold;

        this.update(date, threshold);
    }

    componentWillReceiveProps(nextProps) {
        this.update(nextProps.activeDate, nextProps.threshold);
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

    renderPercentSummary(who, data) {
        return ([
            <tr>
                <th rowSpan="2">{who}</th>
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

    renderValueSummary(who, data) {
        return ([
            <tr>
                <th rowSpan="2">{who}</th>
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
                    <tr><th colSpan="10">Analytics Summary</th></tr>
                    <tr>
                        <th rowSpan="2">Margin</th>
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
                    {this.renderPercentSummary.call(this, "10 Minutes", this.state[10])}
                    {this.renderPercentSummary.call(this, "30 Minutes", this.state[30])}
                </thead>
            </table>
        );
    }

    renderValueTable() {
        return (
            <table className="summary-table alternate-rows-1 dark">
                <thead>
                    <tr><th colSpan="12">Values</th></tr>
                    <tr>
                        <th rowSpan="2">Margin</th>
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
                    {this.renderValueSummary.call(this, "10 Minutes", this.state[10])}
                    {this.renderValueSummary.call(this, "30 Minutes", this.state[30])}
                </thead>
            </table>
        );
    }

    render() {
        return (
            <div className="analytics-summary">
                <AdjustableAnalytics />

                <div>
                    {this.renderPercentageTable.call(this)}
                    {this.renderValueTable.call(this)}
                </div>
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

module.exports = { AnalyticsSummary: connect(mapStateToProps)(AnalyticsSummary) };