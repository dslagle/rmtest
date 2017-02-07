import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { FormatAsTime, FormatDateDiff, RMDate } from "../actions/helpers";

class ActualProblemsList extends Component {
    renderProblems() {
        console.log("render");
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
                        <td className="behind">{FormatAsTime(p.Arrive[0])}</td>
                        <td>{FormatAsTime(p.Depart[0])}</td>
                        <td>{p["Arrival Completion"][0]}</td>
                        <td>{p["Stop 2"]}</td>
                        <td>{p.StopOrder[1]}</td>
                        <td>{FormatAsTime(p.Scheduled[1])}</td>
                        <td className="behind">{FormatAsTime(p.Arrive[1])}</td>
                        <td>{FormatAsTime(p.Depart[1])}</td>
                        <td>{p["Arrival Completion"][1]}</td>
                    </tr>
                );
            });
    }

    render() {
        return (
            <table className="col-md-12 col-fill-1 problem-list">
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
        );
    }
}

function mapStateToProps(state) {
    return {
        actualProblems: state.actualProblems
    }
}

module.exports = { ActualProblemsList: connect(mapStateToProps)(ActualProblemsList) };