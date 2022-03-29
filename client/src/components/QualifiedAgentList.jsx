import React, {useContext, useEffect} from "react";
import {AgentsContext} from "../context/AgentsContext";
import api from "../apis/api";
import {formatPhoneNumber} from "../utils/utils";

const AgentList = (props) => {
    const {agents, setAgents} = useContext(AgentsContext);

    useEffect(async () => {
        try {
            const response = await api.get("/qualifications");
            setAgents(response.data.data.qualified_agents);
        } catch (err) {
            console.log(err)
        }
    }, [])

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                <tr className="bg-primary">
                    <th scope="col">Agent ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                </tr>
                </thead>
                <tbody>
                {agents && agents.map(agent => {
                    return (
                        <tr key={agent.agentid}>
                            <td>{agent.agentid}</td>
                            <td>{agent.aname}</td>
                            <td>{agent.email}</td>
                            <td>{formatPhoneNumber(agent.phonenum)}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default AgentList