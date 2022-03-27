import React, {useContext, useEffect} from "react";
import api from "../apis/api";
import {AgentsContext} from "../context/AgentsContext";
import {useNavigate} from "react-router-dom";

const AgentList = (props) => {
    const {agents, setAgents} = useContext(AgentsContext);
    let navigate = useNavigate()
    useEffect(async () => {
        try {
          const response = await api.get("/agents");
          setAgents(response.data.data.agents);
        } catch (err) {
            console.log(err)
        }
    }, [])

    const handleDelete = async (agentid) => {
        try {
            const response = await api.delete(`/agents/${agentid}`);
            setAgents(agents.filter((agent) => agent.agentid !== agentid));
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = async (agentid) => {
        navigate(`/agents/${agentid}/update`)
    }

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Agent ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {agents && agents.map(agent => {
                        return (
                            <tr key={agent.agentid}>
                                <td>{agent.agentid}</td>
                                <td>{agent.aname}</td>
                                <td>{agent.salary}</td>
                                <td>{agent.email}</td>
                                <td>{agent.phonenum}</td>
                                <td><button onClick={() => handleUpdate(agent.agentid)} className="btn btn-warning">Update</button></td>
                                <td><button onClick={() => handleDelete(agent.agentid)} className="btn btn-danger">Delete</button></td>
                            </tr>
                            )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AgentList