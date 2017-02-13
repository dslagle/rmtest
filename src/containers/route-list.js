
import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { getRoutes } from "../actions/index";

class RouteList extends Component {
    constructor(props) {
        super(props);

        this.renderRoutes = this.renderRoutes.bind(this);
    }

    componentWillMount() {
        this.props.getRoutes(this.props.activeDate);
    }

    renderRoutes() {
        return this.props.routes.map(r => {
            return (
                <tr key={r.FRMasterRouteID}>
                    <td className="only"><Link to={`/routes/${r.FRMasterRouteID}`}>{r.Name}</Link></td>
                </tr>
            );
        });
    }

    render() {
        return (
            <table className="col-md-12 col-fill-1">
                <thead>
                    <tr>
                        <th>Route</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRoutes()}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps(state) {
    return {
        routes: state.routes,
        activeDate: state.activeDate
    }
}

module.exports = { RouteList: connect(mapStateToProps, { getRoutes })(RouteList) };