import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import React, { Component } from "react";
import { connect } from "react-redux";

class GPSMap extends Component {
    _googleMapComponent = null;

    renderMarker(latlng, icon=null) {
        if (!latlng) return null;

        return (
            <Marker position={latlng} icon={icon} />
        );
    }

    componentWillUpdate(nProps, nState) {
        if (this._googleMapComponent && nProps.vehicle && nProps.nextStop) {
            let bounds = new google.maps.LatLngBounds();

            bounds.extend(nProps.vehicle);
            bounds.extend(nProps.nextStop);

            this._googleMapComponent.fitBounds(bounds);
        }
    }

    render() {
        return (
            <GoogleMapLoader
                containerElement={<div className="map" style={{ height: "500px", width: "100%" }} />}
                googleMapElement={
                    <GoogleMap ref={it => this._googleMapComponent = it} defaultZoom={12} defaultCenter={{ lat: 33.800034, lng: -84.394625 }}>
                        { this.renderMarker(this.props.vehicle, {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 5}) }
                        { this.renderMarker(this.props.nextStop) }
                    </GoogleMap>
                }
            />
        );
    }
};

function mapStateToProps(state) {
    return {
        vehicle: state.selectedGPS ? new google.maps.LatLng(state.selectedGPS.GPS_X, state.selectedGPS.GPS_Y) : null,
        nextStop: state.selectedGPS ? new google.maps.LatLng(state.selectedGPS.DEST_X, state.selectedGPS.DEST_Y) : null
    }
}

module.exports = { GPSMap: connect(mapStateToProps, {  })(GPSMap) };