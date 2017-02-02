import React, { Component } from "react";
import { connect } from "react-redux";
import { getVehiclesGPS } from "../actions/index";
import { FormatAsTime } from "../actions/helpers";

export class VehicleGPS extends Component {
    render() {
        const v = this.props.vehicle;
        //<td className={sa < -180000 ? "behind" : sa > 180000 ? "ahead" : "ontime"}>{FormatAsTime(v.ETA)}</td>
        return (
            <tr key={v.VehicleID}>
                <td>{v.VehicleName}</td>
                <td>{`(${v.GPS_X}, ${v.GPS_Y})`}</td>
                <td>{v.StopName}</td>
                <td>{FormatAsTime(v.Scheduled)}</td>
                <td className="fade-in">{FormatAsTime(v.ETA)}</td>
            </tr>
        );
    }
}