import React, { Component } from 'react';
import { Link } from "react-router";
import { GPSMap } from "../components/google-map";

export class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">RM</a>
            </div>

            <ul className="nav navbar-nav float-xs-left">
              <li className="nav-item"><Link to="/" className="nav-link"><span className="text-info">Home</span></Link></li>
              <li className="nav-item"><Link to="/runs" className="nav-link"><span className="text-info">Runs</span></Link></li>
              <li className="nav-item"><Link to="/routes" className="nav-link"><span className="text-info">Routes</span></Link></li>
              <li className="nav-item"><Link to="/stops" className="nav-link"><span className="text-info">Stops</span></Link></li>
              <li className="nav-item"><Link to="/troubleshooting" className="nav-link"><span className="text-info">Troubleshooting</span></Link></li>
            </ul>

            <div className="navbar-right" style={{ marginRight: "5px" }}>
              <ul className="nav navbar-nav">
                <li className="dropdown">
                  <a className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    <img src="/resources/ic_settings_24px.svg" />
                    <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link to="/">Item 1</Link></li>
                    <li><Link to="/">Item 2</Link></li>
                    <li><Link to="/">Item 3</Link></li>
                    <li><Link to="/">Item 4</Link></li>
                  </ul>
                </li>
              </ul>
              
              <Link className="navbar-btn btn btn-info btn-sm" to="/posts/create">Create Post</Link>
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
