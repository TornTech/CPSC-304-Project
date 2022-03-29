import React, {useContext, useEffect} from "react";
import {LocationsContext} from "../context/LocationsContext";
import {formatDollar, formatPhoneNumber} from "../utils/utils";
import api from "../apis/api";

const LocationsList = () => {
    const {locations, setLocations} = useContext(LocationsContext);
    useEffect(async () => {
        try {
            const response = await api.get("/locations");
            setLocations(response.data.data.locations);
        } catch (err) {

        }
    }, [])

    return (
        <div >
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Call Centre ID</th>
                        <th scope="col">Address</th>
                        <th scope="col">Manager Name</th>
                        <th scope="col">Phone Line Count</th>
                        <th scope="col">Average Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {locations && locations.map(location => {
                        return (
                            <tr key={location.callcentreid}>
                                <td>{location.callcentreid}</td>
                                <td>{location.ccaddress}</td>
                                <td>{location.managername}</td>
                                <td>{location.phonelinecount}</td>
                                <td>{formatDollar(Number(location.avg_salary))}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default LocationsList;