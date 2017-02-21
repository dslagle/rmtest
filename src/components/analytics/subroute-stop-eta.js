import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Axios from "axios";

import { ETASVG } from "./eta-svg";
import { ETAInfoTooltip } from "./eta-info-tooltip";
import { getStopETAAnalytics } from "../../actions/index";
import { BASE_URL } from "../../../api-config";

class StopETAAnalytics extends Component {
    constructor(props) {
        super(props);

        this.renderStops = this.renderStops.bind(this);
        this.update = this.update.bind(this);
        this.state = { stops: [] };
    }

    update(subrouteid, date, threshold) {
        const url = `${BASE_URL}/analytics/eta/patterns/${subrouteid}?date=${date.valueOf()}&${threshold ? `threshold=${threshold}` : ''}`;
        Axios.get(url)
            .then(response => this.setState({ stops: response.data }))
            .catch(err => console.error(err));
    }

    componentWillMount() {
        const subrouteid = this.props.params.id;
        const date = this.props.activeDate;
        const threshold = this.props.threshold;

        this.update(subrouteid, date, threshold);
    }

    componentWillReceiveProps(nextProps) {
        this.update(nextProps.params.id, nextProps.activeDate, nextProps.threshold);
    }
    
    renderStops() {
        return this.state.stops.sort((s1, s2) => +s2.StopOrder < +s1.StopOrder ? 1 : -1).map(p => {
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
            
            return (
                <tr key={p.SubrouteStopID}>
                    <td>{p.StopOrder}</td>
                    <td>{p.StopName}</td>
                    <td className="rm-tooltip">
                        <ETASVG p1={p1} p2={p2} p3={p3} />
                        <ETAInfoTooltip p1={p1} p2={p2} p3={p3} total={p.Total1} />
                    </td>
                    <td className="rm-tooltip">
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
            <div>
                <div className="crumbs">
                    <span>{(this.state.stops && this.state.stops.length > 0) ? this.state.stops[0].SubrouteName : "?"}</span>
                </div>
                <table className="col-md-12 col-fill-2 alternate-rows-1">
                    <thead>
                        <tr>
                            <th rowSpan="2">#</th>
                            <th rowSpan="2">Stop</th>
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
                        {this.renderStops()}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeDate: state.activeDate,
        threshold: state.threshold
    }
}

module.exports = { StopETAAnalytics: connect(mapStateToProps, { getStopETAAnalytics })(StopETAAnalytics) };