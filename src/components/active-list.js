import React from "react";
import { GPSMap } from "./google-map";
import { VehicleList } from "../containers/vehicle-list";

export default (props) => {
    return (
        <div>
            <VehicleList />
            <GPSMap />
        </div>
    )
}