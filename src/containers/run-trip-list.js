import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { getRunTrips } from "../actions/index";

class RunTripList extends Component {
    constructor(props) {
        super(props);
        this.renderTrips = this.renderTrips.bind(this);
    }

    componentWillMount() {
        this.props.getRunTrips(this.props.params.id);
    }

    renderTrips() {
        return this.props.trips.map(t => {
            return (
                <tr key={t.TripID}>
                    <td><Link to={`/trips/${t.TripID}`}>{t.TripName}</Link></td>
                    <td>{t.RunName}</td>
                    <td>{t.RouteName}</td>
                    <td>{t.PatternName}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <table className="col-md-12">
                <thead>
                    <tr>
                        <th>Trip</th>
                        <th>Run</th>
                        <th>Route</th>
                        <th>Pattern</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderTrips()}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps(state) {
    return {
        trips: state.runTrips
    }
}

module.exports = { RunTripList: connect(mapStateToProps, { getRunTrips })(RunTripList) };