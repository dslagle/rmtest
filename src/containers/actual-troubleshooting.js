import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { getActualProblems } from "../actions/index";
import { FormatAsTime, FormatDateDiff, RMDate } from "../actions/helpers";
import { DateField, DatePicker } from "react-date-picker";

class ActualProblemsList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //this.props.getActualProblems(this.state.problemDate);
    }

    onChange(dateString) {
        const d = RMDate(dateString);
        this.props.getActualProblems(d);
    }

    renderProblems() {
        return this.props.actualProblems
        .map(p => {
            return (
                <tr key={p.DailyStopID}>
                    <td>{p.Vehicle}</td>
                    <td>{p.Subroute}</td>
                    <td>{p.Trip}</td>
                    <td>{p["Stop 1"]}</td>
                    <td>{p.StopOrder[0]}</td>
                    <td>{FormatAsTime(p.Scheduled[0])}</td>
                    <td>{FormatAsTime(p.Arrive[0])}</td>
                    <td>{FormatAsTime(p.Depart[0])}</td>
                    <td>{p["Arrival Completion"][0]}</td>
                    <td>{p["Stop 2"]}</td>
                    <td>{p.StopOrder[1]}</td>
                    <td>{FormatAsTime(p.Scheduled[1])}</td>
                    <td>{FormatAsTime(p.Arrive[1])}</td>
                    <td>{FormatAsTime(p.Depart[1])}</td>
                    <td>{p["Arrival Completion"][1]}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div>
                <DateField
                    className="problem-date"
                    dateFormat="YYYY-MM-DD"
                    forceValidDate={true}
                    defaultValue={Date.now()}
                    onChange={(d) => this.onChange(d)}
                    updateOnDateClick={true}
                    collapseOnDateClick={true}>
                    
                    <DatePicker
                        navigation={true}
                        locale="en"
                        forceValidDate={true}
                        highlightWeekends={true}
                        highlightToday={true}
                        weekNumbers={true}
                        weekStartDay={0}
                    />
                </DateField>

                <table className="col-md-12 col-fill-1">
                    <thead>
                        <tr>
                            <th>Vehicle</th>
                            <th>Route</th>
                            <th>Trip</th>
                            <th>Stop 1</th>
                            <th>Order</th>
                            <th>Scheduled</th>
                            <th>Arrive</th>
                            <th>Depart</th>
                            <th>Completion</th>
                            <th>Stop 2</th>
                            <th>Order</th>
                            <th>Scheduled</th>
                            <th>Arrive</th>
                            <th>Depart</th>
                            <th>Completion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderProblems()}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        actualProblems: state.actualProblems
    }
}

module.exports = { ActualProblemsList: connect(mapStateToProps, { getActualProblems })(ActualProblemsList) };