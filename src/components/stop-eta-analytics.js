import React, { Component } from "react";
import { connect } from "react-redux";
import { ETASVG } from "../components/eta-svg";
import { ETAInfoTooltip } from "../components/eta-info-tooltip";
import { getStopETAAnalytics } from "../actions/index";
import ReactTooltip from "react-tooltip";
import moment from "moment";
import Axios from "axios";

const BASE_URL = `http://50.167.185.158:9000/data`;
//const BASE_URL = `http://localhost:9000/data`;
//const BASE_URL = `http://10.7.1.124:9000/data`;

class StopETAAnalytics extends Component {
    constructor(props) {
        super(props);

        this.renderStops = this.renderStops.bind(this);
        this.update = this.update.bind(this);
        this.state = { stops: [] };
    }

    update(subrouteid, date, threshold) {
        const url = `${BASE_URL}/analytics/eta/patterns/${subrouteid}?date=${date}&${threshold ? `threshold=${threshold}` : ''}`;
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
            let p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12;

            if (p.Total1 > 0) {
                p1 = Math.round(p.Under1 * 100 / p.Total1);
                p2 = Math.round(p.Over1 * 100 / p.Total1);
                p3 = Math.round((p.Total1 - p.Under1 - p.Over1) * 100 / p.Total1);
            }
        
            if (p.Total2 > 0) {
                p4 = Math.round(p.Under2 * 100 / p.Total2);
                p5 = Math.round(p.Over2 * 100 / p.Total2);
                p6 = Math.round((p.Total2 - p.Under2 - p.Over2) * 100 / p.Total2);
            }
            
            if (p.Total3 > 0) {
                p7 = Math.round(p.Under3 * 100 / p.Total3);
                p8 = Math.round(p.Over3 * 100 / p.Total3);
                p9 = Math.round((p.Total3 - p.Under3 - p.Over3) * 100 / p.Total3);
            }

            if (p.Total4 > 0) {
                p10 = Math.round(p.Under4 * 100 / p.Total4);
                p11 = Math.round(p.Over4 * 100 / p.Total4);
                p12 = Math.round((p.Total4 - p.Under4 - p.Over4) * 100 / p.Total4);
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
                    <td className="rm-tooltip">
                        <ETASVG p1={p7} p2={p8} p3={p9} />
                        <ETAInfoTooltip p1={p7} p2={p8} p3={p9} total={p.Total3} />
                    </td>
                    <td className="rm-tooltip">
                        <ETASVG p1={p10} p2={p11} p3={p12} />
                        <ETAInfoTooltip p1={p10} p2={p11} p3={p12} total={p.Total4} />
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
                <table className="col-md-12 col-fill-2">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Stop</th>
                            <th>1-5 Minutes</th>
                            <th>6-10 Minutes</th>
                            <th>11-15 Minutes</th>
                            <th>>15 Minutes</th>
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