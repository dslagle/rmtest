import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { getRuns } from "../actions/index";
import { FormatAsTime } from "../actions/helpers";

class RunList extends Component {
    constructor(props) {
        super(props);

        this.renderRuns = this.renderRuns.bind(this);
    }

    componentWillMount() {
        this.props.getRuns();
    }

    renderRuns() {
        return this.props.runs.map(r => {
            return (
                <tr key={r.ActualRunID}>
                    <td><Link to={`/runs/${r.ActualRunID}`}>{r.Name}</Link></td>
                    <td>{r.VehicleName}</td>
                    <td>{r.DriverName}</td>
                    <td className="center"><input readOnly type="checkbox" checked={r.Started} /></td>
                    <td className="center"><input readOnly type="checkbox" checked={r.Completed} /></td>
                    <td>{FormatAsTime(r.ScheduledStartTime)}</td>
                    <td>{FormatAsTime(r.ScheduledEndTime)}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <table className="col-md-12 col-fill-1">
                <thead>
                    <tr>
                        <th>Run</th>
                        <th>Vehicle</th>
                        <th>Driver</th>
                        <th>Started</th>
                        <th>Completed</th>
                        <th>Start</th>
                        <th>End</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRuns()}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps(state) {
    return {
        runs: state.runs
    }
}

module.exports = { RunList: connect(mapStateToProps, { getRuns })(RunList) };