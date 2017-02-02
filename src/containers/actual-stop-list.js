import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { getActualStops } from "../actions/index";
import { FormatAsTime, FormatDateDiff } from "../actions/helpers";

class ActualStopList extends Component {
    constructor(props) {
        super(props);

        this.renderStops = this.renderStops.bind(this);
    }

    componentWillMount() {
        this.props.getActualStops();
    }

    renderStops() {
        return this.props.actualStops
        // .filter(s => {
        //     const diff = (new Date(s.DepartTime).getTime() - new Date(s.ScheduledStopTime).getTime()) / 1000 / 60;
        //     return diff > 15;
        // })
        .map(s => {
            const diff = (new Date(s.DepartTime).getTime() - new Date(s.ScheduledStopTime).getTime()) / 1000 / 60;
            return (
                <tr key={s.DailyTimeTableID}>
                    <td>{s.name}</td>
                    <td>{s.TripDescription}</td>
                    <td>{s.TripStopType}</td>
                    <td>{FormatAsTime(s.ScheduledStopTime)}</td>
                    <td>{FormatAsTime(s.ArriveTime)}</td>
                    <td>{FormatAsTime(s.DepartTime)}</td>
                    <td className={diff < 0 ? "ahead" : "behind"}>{FormatDateDiff(s.DepartTime, s.ScheduledStopTime)}</td>
                </tr>
            );
        });
    }

    render() {
        const earlyCount = this.props.actualStops.filter(s => {
            const diff = (new Date(s.DepartTime).getTime() - new Date(s.ScheduledStopTime).getTime()) / 1000 / 60;
            return diff < 0;
        }).length;
        const lateCount = this.props.actualStops.filter(s => {
            const diff = (new Date(s.DepartTime).getTime() - new Date(s.ScheduledStopTime).getTime()) / 1000 / 60;
            return diff > 0;
        }).length;
        
        return (
            <div>
                <h3>Late: {lateCount} Early: {earlyCount}</h3>
                <table className="col-md-12 col-fill-1">
                    <thead>
                        <tr>
                            <th>Stop</th>
                            <th>Trip</th>
                            <th>Type</th>
                            <th>Scheduled</th>
                            <th>Arrive</th>
                            <th>Depart</th>
                            <th>Diff</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderStops()}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        actualStops: state.actualStops
    }
}

module.exports = { ActualStopList: connect(mapStateToProps, { getActualStops })(ActualStopList) };