import React, {useState, createContext} from "react";

export const LocationsContext = createContext();

export const LocationsContextProvider = props => {
    const [locations, setLocations] = useState([]);

    const addLocation = (location) => {
        setLocations([...locations, location]);
    }

    return (
        <LocationsContext.Provider value={{locations, setLocations, addLocation}}>
            {props.children}
        </LocationsContext.Provider>
    )
}