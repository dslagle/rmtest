import React, { Component } from "react";
import moment from "moment";
import { DateRange } from "../actions/helpers";
import Axios from "axios";

export class ProblemCalendar extends Component {
    constructor(props) {
        super(props);

        this.update = this.update.bind(this);
        this.state = { problemCounts: { } };
    }

    update(d1) {
        const start = moment(d1).utc().startOf('month');
        const end = moment(d1).utc().endOf('month');

        Axios.get(`http://localhost:9000/data/problemcounts/${start.valueOf()}/${end.valueOf()}`)
            .then((response) => this.setState({ ...this.state, ...response.data }))
            .catch(err => console.log(err));
    }

    componentWillMount() {
        this.update(moment().utc().subtract(2, 'month'));
        this.update(moment().utc().subtract(1, 'month'));
        this.update(moment().utc());
    }

    renderMonth(date) {
        const firstDayOfMonth = moment(date).utc().startOf('month');
        const lastDayOfMonth = moment(firstDayOfMonth).utc().endOf('month');
        
        let firstDayOfWeek = moment(firstDayOfMonth).utc().startOf('week');
        let lastDayOfWeek = moment(firstDayOfWeek).utc().endOf('week');

        let index = 0;
        const weeks = [];
        while (firstDayOfWeek.valueOf()<= lastDayOfMonth.valueOf()) {
            weeks.push(<div className="week" key={firstDayOfWeek.valueOf()}>{
                DateRange(firstDayOfWeek, lastDayOfWeek).map(m => {
                    const offMonth = m.month() !== firstDayOfMonth.month();
                    const today = moment(m).utc().startOf('day').valueOf() === moment().utc().startOf('day').valueOf();

                    const monthData = this.state[moment(m).utc().startOf("month").format("YYYY-MM-DD")];
                    const text = monthData ? monthData[moment(m).utc().format("YYYY-MM-DD")].Count : "X";

                    return (
                        <div className={`day ${offMonth ? "off-month" : ""} ${!offMonth && today ? "today" : ""}`} key={m.valueOf()}>
                            <span className="week-day">{m.format("D")}</span>
                            <span className="problem-count">{text}</span>
                        </div>
                    );
                })
            }
            </div>);

            firstDayOfWeek = moment(lastDayOfWeek).utc().add(1, 'day');
            lastDayOfWeek = moment(firstDayOfWeek).utc().endOf('week');

            index += 1;
            if (index > 4) break;
        }

        return (
            <div className="month">
                <span className="title">{firstDayOfMonth.format("MMMM YYYY")}</span>
                {weeks}
            </div>
        );
    }

    render() {
        return (
            <div className="problem-calendar">
                {this.renderMonth.call(this, moment().utc().subtract(2, 'month'))}
                {this.renderMonth.call(this, moment().utc().subtract(1, 'month'))}
                {this.renderMonth.call(this, moment().utc())}
            </div>
        );
    }
}