import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { getRoutePatterns } from "../actions/index";

class RoutePatternList extends Component {
    constructor(props) {
        super(props);
        this.renderPatterns = this.renderPatterns.bind(this);
    }

    componentWillMount() {
        this.props.getRoutePatterns(this.props.params.id);
    }

    renderPatterns() {
        return this.props.patterns.map(p => {
            return (
                <tr key={p.FRSubrouteID}>
                    <td className="only"><Link to={`/patterns/${p.FRSubrouteID}`}>{p.Name}</Link></td>
                </tr>
            );
        });
    }

    render() {
        return (
            <table className="col-md-12 col-fill-1">
                <thead>
                    <tr>
                        <th>Pattern</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderPatterns()}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps(state) {
    return {
        patterns: state.routePatterns
    }
}

module.exports = { RoutePatternList: connect(mapStateToProps, { getRoutePatterns })(RoutePatternList) };