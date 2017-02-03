import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { getActualProblems } from "../actions/index";
import { FormatAsTime, FormatDateDiff, RMDate } from "../actions/helpers";
import { TransitionView, MultiMonthView } from "react-date-picker";
import { browserHistory } from "react-router";
import Axios from "axios";

export class ProblemsList extends Component {
    constructor(props) {
        super(props);

        const sdate = RMDate(Date.now());
        sdate.setDate(sdate.getDate() - 10);
        this.state = { sdate: sdate, edate: RMDate(Date.now()), problems: [] };
    }

    update(d1, d2) {
        console.log(d1);
        console.log(d2);
        Axios.get(`http://localhost:9000/data/problemcounts/${+d1}/${+d2}`)
            .then((response) => this.setState({ sdate: RMDate(+d1), edate: RMDate(+d2), problems: response.data }))
            .catch(err => console.log(err));
    }

    componentWillMount() {
        const d1 = this.props.params.sdate || Date.now() - (10*24*60*60*1000); //minus 10 days in ms
        const d2 = this.props.params.edate || Date.now();
        browserHistory.push(`/troubleshooting/${d1}/${d2}`);
    }

    componentWillReceiveProps(nextProps) {
        this.update.call(this, nextProps.params.sdate, nextProps.params.edate);
    }

    onRangeChange(range) {
        const d1 = RMDate(d1);
        const d2 = RMDate(d2);
        browserHistory.push(`/troubleshooting/${d1.getTime()}/${d2.getTime()}`);
    }

    render() {
        return (
            <div>
                <TransitionView footer={false} navigation={true}>
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

                
            </div>
        );
    }
}