import React, {useContext, useEffect} from "react";
import api from "../apis/api";
import {AgentsContext} from "../context/AgentsContext";

const AgentList = (props) => {
    const {agents, setAgents} = useContext(AgentsContext);
    useEffect(() => {
        const fetchData = async() => {
            try {
              const response = await api.get("/agents");
              setAgents(response.data.data.agents);
            } catch (e) {

            }
        }
        fetchData();
    }, [])

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
                                <td><button className="btn btn-warning">Update</button></td>
                                <td><button className="btn btn-danger">Delete</button></td>
                            </tr>
                            )
                    })}
                    {/*<tr>*/}
                    {/*    <td>1</td>*/}
                    {/*    <td>Ben</td>*/}
                    {/*    <td>69000</td>*/}
                    {/*    <td>tornben@gmail.com</td>*/}
                    {/*    <td>6045621572</td>*/}
                    {/*    <td><button className="btn btn-warning">Update</button></td>*/}
                    {/*    <td><button className="btn btn-danger">Delete</button></td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                    {/*    <td>1</td>*/}
                    {/*    <td>Ben</td>*/}
                    {/*    <td>69000</td>*/}
                    {/*    <td>tornben@gmail.com</td>*/}
                    {/*    <td>6045621572</td>*/}
                    {/*    <td><button className="btn btn-warning">Update</button></td>*/}
                    {/*    <td><button className="btn btn-danger">Delete</button></td>*/}
                    {/*</tr>*/}
                </tbody>
            </table>
        </div>
    )
}

export default AgentList