import React, { Component } from "react";
import { connect } from "react-redux";
import socket from "socket.io-client";
import { getVehiclesGPS } from "../actions/index";

const serverURL = "http://localhost:9000";

class SocketIO extends Component {
    socket = null;

    componentWillMount() {
        this.socket = socket.connect(serverURL);

        this.socket.on("upateGPS", this.handleSearch.bind(this));
    }

    handleUpdateGPS() {
        this.props.getVehiclesGPS();
    }

    render() {
        return null;
    }
}

module.exports = { SocketIO: connect(null, { getVehiclesGPS })(SocketIO) };