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
              <a className="navbar-brand" href="#">RM</a>
            </div>

            <ul className="nav navbar-nav float-xs-left">
              <li className="dropdown">
                <a className="dropdown-toggle text-info" data-toggle="dropdown" role="button" aria-expanded="false">
                  ETA Analytics
                  <span className="caret"></span>
                </a>
                <ul className="dropdown-menu" role="menu">
                  <li><Link to="/analytics/patterns">Route Patterns</Link></li>
                  <li><Link to="/analytics/stops">Stops</Link></li>
                </ul>
              </li>
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
