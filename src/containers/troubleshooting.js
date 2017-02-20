import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { getActualProblems } from "../actions/index";
import { TransitionView, MultiMonthView } from "react-date-picker";
import { browserHistory } from "react-router";
import { DateRange } from "../actions/helpers";
import Axios from "axios";
import moment from "moment";
import { ActualProblemsList } from "./actual-troubleshooting";
import { BASE_URL } from "../../api-config";

class ProblemsList extends Component {
    constructor(props) {
        super(props);

        const sdate = moment(Date.now()).startOf("day").add(-10, "days").valueOf();
        const edate = moment(Date.now()).startOf("day").valueOf();
        
        this.state = { sdate: sdate, edate: edate, problems: null, selectedDate: sdate };
    }

    update(d1, d2) {
        Axios.get(`${BASE_URL}/problemcounts/${+d1}/${+d2}`)
            .then((response) => this.setState({ sdate: moment(+d1).valueOf(), edate: moment(+d2).valueOf(), problems: response.data }))
            .catch(err => console.log(err));
    }

    componentWillMount() {
        const d1 = this.props.params.sdate || moment(Date.now()).startOf("day").add(-10, "days").valueOf(); //minus 10 days in ms
        const d2 = this.props.params.edate || moment(Date.now()).startOf("day").valueOf();

        browserHistory.push(`/troubleshooting/${d1}/${d2}`);
    }

    componentWillReceiveProps(nextProps) {
        this.update.call(this, nextProps.params.sdate, nextProps.params.edate);
    }

    onRangeChange(range) {
        if (range.length !== 2) return;

        const d1 = moment(range[0]).valueOf();
        const d2 = moment(range[1]).valueOf();
        
        browserHistory.push(`/troubleshooting/${d1}/${d2}`);
    }

    selectDate(date) {
        this.setState({ ...this.state, selectedDate: date });
        this.props.getActualProblems(date);
    }

    renderDays() {
        return DateRange(this.state.sdate, this.state.edate)
            .map(d => {
                return (
                    <div className="day" key={d.valueOf()} onClick={() => this.selectDate(d.valueOf())}>
                        <span>{d.format("MM/DD/YYYY")}</span>
                        <span className="problem-count">
                            {this.state.problems ? this.state.problems[d.format("YYYY-MM-DD")].Count : "X"}
                        </span>
                    </div>
                );
            })
    }

    render() {
        return (
            <div>
                <TransitionView footer={false} navigation={true} style={ { float: "left" } }>
                    <MultiMonthView
                        highlightWeekends={true}
                        highlightToday={true}
                        weekNumbers={true}
                        locale="en"
                        highlightRangeOnMouseMove={true}
                        weekStartDay={0}
                        footer={false}
                        defaultRange={[this.state.sdate, this.state.edate]}
                        onRangeChange={(d) => this.onRangeChange(d)}
                    />
                </TransitionView>

                <div className="day-view col-md-6">
                    {this.renderDays.call(this)}
                </div>

                <h3 style={{ display: "block", clear: "both", paddingTop: "10px", margin: "0" }}>{moment(this.state.selectedDate).utc().format("MM/DD/YYYY")}</h3>
                <div className="problem-table-container">
                    <ActualProblemsList />
                </div>
            </div>
        );
    }
}

module.exports = { ProblemsList: connect(null, { getActualProblems })(ProblemsList) };