import React, { Component } from "react";
import { connect } from "react-redux";
import { getVehiclesGPS, selectGPS } from "../actions/index";
import { FormatAsTime } from "../actions/helpers";

class VehicleList extends Component {
    constructor(props) {
        super(props);
        this.renderVehicles = this.renderVehicles.bind(this);
    }

    interval;

    componentWillMount() {
        this.props.getVehiclesGPS();
        this.interval = setInterval(() => this.props.getVehiclesGPS(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderVehicles() {
        return this.props.vehicles.map(v => {
            const sa = (new Date(v.Scheduled).getTime()) - (new Date(v.ETA).getTime());
            const name = (this.props.selected && this.props.selected.VehicleID === v.VehicleID) ? "selected" : "";
            //<td>{`(${v.GPS_X}, ${v.GPS_Y})`}</td>
            return (
                <tr key={v.VehicleID} onClick={() => this.props.selectGPS(v)} className={name}>
                    <td>{v.VehicleName}</td>
                    <td>{v.RouteName}</td>
                    <td>{v.PatternName}</td>
                    <td>{v.StopName}</td>
                    <td>{FormatAsTime(v.Scheduled)}</td>
                    <td className={sa < -180000 ? "behind" : sa > 180000 ? "ahead" : "ontime"}>{FormatAsTime(v.ETA)}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div className="table-container">
                <table className="col-md-12 col-fill-3 hot-track-row selectable-row">
                    <thead>
                        <tr>
                            <th>Vehicle</th>
                            <th>Route</th>
                            <th>Pattern</th>
                            <th>Next Stop</th>
                            <th>Scheduled</th>
                            <th>ETA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderVehicles()}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        vehicles: state.vehiclesGPS,
        selected: state.selectedGPS
    }
}

module.exports = { VehicleList: connect(mapStateToProps, { getVehiclesGPS, selectGPS })(VehicleList) };