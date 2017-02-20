import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { ETASVG } from "../components/eta-svg";
import { ETAInfoTooltip } from "../components/eta-info-tooltip";
import Axios from "axios";
import moment from "moment";
import { BASE_URL } from "../../api-config";

class RoutePatternETAAnalytics extends Component {
    constructor(props) {
        super(props);

        this.renderPatterns = this.renderPatterns.bind(this);
        this.state = { patterns: [] };
    }

    update(date, threshold) {
        const url = `${BASE_URL}/analytics/eta/patterns?date=${date.valueOf()}&${threshold ? `threshold=${threshold}` : ''}`;
        Axios.get(url)
            .then(response => this.setState({ patterns: response.data }))
            .catch(err => console.error(err));
    }

    componentWillMount() {
        const date = this.props.activeDate;
        const threshold = this.props.threshold;

        this.update(date, threshold);
    }

    componentWillReceiveProps(nextProps) {
        this.update(nextProps.activeDate, nextProps.threshold);
    }

    renderPatterns() {
        return this.state.patterns.map(p => {
            let p1, p2, p3, p4, p5, p6;
            let g1, g2, g3, g4, g5, g6;

            if (p.Total1 > 0) {
                p1 = Math.round(p.Under1 * 100 / p.Total1);
                p2 = Math.round(p.Over1 * 100 / p.Total1);
                p3 = Math.round((p.Total1 - p.Under1 - p.Over1) * 100 / p.Total1);

                g1 = Math.round(p.GoogleUnder1 * 100 / p.Total1);
                g2 = Math.round(p.GoogleOver1 * 100 / p.Total1);
                g3 = Math.round((p.Total1 - p.GoogleUnder1 - p.GoogleOver1) * 100 / p.Total1);
            }

            if (p.Total2 > 0) {
                p4 = Math.round(p.Under2 * 100 / p.Total2);
                p5 = Math.round(p.Over2 * 100 / p.Total2);
                p6 = Math.round((p.Total2 - p.Under2 - p.Over2) * 100 / p.Total2);

                g4 = Math.round(p.GoogleUnder2 * 100 / p.Total2);
                g5 = Math.round(p.GoogleOver2 * 100 / p.Total2);
                g6 = Math.round((p.Total2 - p.GoogleUnder2 - p.GoogleOver2) * 100 / p.Total2);
            }
/*
            <td className="rm-tooltip">
                <ETASVG p1={p7} p2={p8} p3={p9} />
                <ETAInfoTooltip p1={p7} p2={p8} p3={p9} total={p.Total3} />
            </td>
            <td className="rm-tooltip">
                <ETASVG p1={p10} p2={p11} p3={p12} />
                <ETAInfoTooltip p1={p10} p2={p11} p3={p12} total={p.Total4} />
            </td>*/

            return (
                <tr key={p.SubrouteID}>
                    <td><Link to={`/analytics/patterns/${p.SubrouteID}`}>{p.SubrouteName}</Link></td>
                    <td className="rm-tooltip eta-graph">
                        <ETASVG p1={p1} p2={p2} p3={p3} />
                        <ETAInfoTooltip p1={p1} p2={p2} p3={p3} total={p.Total1} />
                    </td>
                    <td className="rm-tooltip eta-graph">
                        <ETASVG p1={p4} p2={p5} p3={p6} />
                        <ETAInfoTooltip p1={p4} p2={p5} p3={p6} total={p.Total2} />
                    </td>
                    <td className="rm-tooltip eta-graph">
                        <ETASVG p1={g1} p2={g2} p3={g3} />
                        <ETAInfoTooltip p1={g1} p2={g2} p3={g3} total={p.Total1} />
                    </td>
                    <td className="rm-tooltip eta-graph">
                        <ETASVG p1={g4} p2={g5} p3={g6} />
                        <ETAInfoTooltip p1={g4} p2={g5} p3={g6} total={p.Total2} />
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <table className="col-md-12 col-fill-1 alternate-rows-1">
                <thead>
                    <tr>
                        <th rowSpan="2">Route Pattern</th>
                        <th colSpan="2">RM</th>
                        <th colSpan="2">Google</th>
                    </tr>
                    <tr>
                        <th>10 Minutes</th>
                        <th>30 Minutes</th>
                        <th>10 Minutes</th>
                        <th>30 Minutes</th>
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
        activeDate: state.activeDate,
        threshold: state.threshold
    }
}

module.exports = { RoutePatternETAAnalytics: connect(mapStateToProps)(RoutePatternETAAnalytics) };