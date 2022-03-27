import React, {useState, createContext} from "react";

export const AgentsContext = createContext();

export const AgentsContextProvider = props => {
    const [agents, setAgents] = useState([])

    const addAgents = (agent) => {
        setAgents([...agents, agent])
    }
    return (
        <AgentsContext.Provider value={{agents, setAgents, addAgents}}>
            {props.children}
        </AgentsContext.Provider>
    )
}