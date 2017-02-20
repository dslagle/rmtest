import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router";
import { GPSMap } from "../components/google-map";
import { setAciveDate, getPatternETAAnalytics } from "../actions/index";
import DatePicker from "react-datepicker";
import moment from "moment";

class App extends Component {
  render() {

    // <li className="nav-item"><Link to="/" className="nav-link"><span className="text-info">Home</span></Link></li>
    // <li className="nav-item"><Link to="/runs" className="nav-link"><span className="text-info">Runs</span></Link></li>
    // <li className="nav-item"><Link to="/routes" className="nav-link"><span className="text-info">Routes</span></Link></li>
    // <li className="nav-item"><Link to="/stops" className="nav-link"><span className="text-info">Stops</span></Link></li>

    return (
      <div>
        <nav id="menu-bar" className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" href="/">RM Analytics</Link>
            </div>

            <ul className="nav navbar-nav float-xs-left">
              <li><Link to="/analytics/summary">Summary</Link></li>
              <li><Link to="/analytics/patterns">Route Patterns</Link></li>
            </ul>

            <div className="navbar-form navbar-right">

            </div>
          </div>
        </nav>

        <div className="content col-md-12">
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { activeDate: state.activeDate }
}

module.exports = { App: connect(mapStateToProps, { setAciveDate, getPatternETAAnalytics })(App) };
