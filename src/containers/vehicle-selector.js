import React, { Component } from "react";
import { connect } from "react-redux";

class VehicleSelector extends Component {
    renderVehicles() {
        return (
            this.props.vehicles.map(v => {
                return (
                    <li
                        key={v.name}
                        className="list-group-item">{v.name}</li>
                );
            })
        );
    }

    render() {
        return (
            <form className="navbar-form navbar-left">
                <div className="input-group">
                    <input type="text" className="form-control" aria-label="..." readOnly />
                    <div className="input-group-btn dropdown">
                        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-right vehicle-dropdown" aria-labelledby="dropdownMenu1">
                            {this.renderVehicles()}
                        </ul>
                    </div>
                </div>
            </form>
        );
    }
}


function mapStateToProps(state) {
    return {
        vehicles: state.vehicles
    };
}

module.exports = { VehicleSelector: connect(mapStateToProps)(VehicleSelector) };