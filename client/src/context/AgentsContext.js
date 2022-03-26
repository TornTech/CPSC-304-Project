import React, {useState, createContext} from "react";

export const AgentsContext = createContext();

export const AgentsContextProvider = props => {
    const [agents, setAgents] = useState([])

    return (
        <AgentsContext.Provider value={{agents, setAgents}}>
            {props.children}
        </AgentsContext.Provider>
    )
}