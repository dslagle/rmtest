import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { getTripStops } from "../actions/index";
import { FormatAsTime } from "../actions/helpers";

class TripStopList extends Component {
    constructor(props) {
        super(props);
        this.renderStops = this.renderStops.bind(this);
    }

    componentWillMount() {
        this.props.getTripStops(this.props.params.id);
    }

    renderStops() {
        return this.props.stops.map(s => {
            return (
                <tr key={s.TripStopID}>
                    <td>{s.Name}</td>
                    <td>{FormatAsTime(s.ScheduledDateTime)}</td>
                    <td>{FormatAsTime(s.ETA)}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <table className="col-md-12">
                <thead>
                    <tr>
                        <th>Stop</th>
                        <th>Scheduled</th>
                        <th>ETA</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderStops()}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps(state) {
    return {
        stops: state.tripStops
    }
}

module.exports = { TripStopList: connect(mapStateToProps, { getTripStops })(TripStopList) };