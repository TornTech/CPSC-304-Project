import React, {useContext, useEffect, useState} from "react";
import {AgentsContext} from "../context/AgentsContext";
import api from "../apis/api";
import {formatDollar, formatPhoneNumber} from "../utils/utils";
import {useNavigate} from "react-router-dom";

const CompensationSearch = () => {

    const {agents, setAgents} = useContext(AgentsContext);
    // let navigate = useNavigate();
    const [searchCompleted, setSearchCompleted] = useState(false);
    const [salaryVal, setSalaryVal] = useState("");

    const handleSearch = (e) => {
        const fetchData = async () => {
            try {
                e.preventDefault();
                const response = await api.get(`/stats/agents/compensation?salary=${salaryVal}`);
                setAgents(response.data.data.agents);
                setSearchCompleted(true);
            } catch (err) {

            }
        }
        fetchData();
    }

    return (
        <div>
            <div className="card">
                <div className="card-header"> Search for agents making over </div>
                <div className="card-body">
                    <form action="">
                        <div className="form-row">
                            <div className="col">
                                <input
                                    value={salaryVal}
                                    onChange={e => setSalaryVal(e.target.value)}
                                    type="number"
                                    className="form-control"
                                    placeholder="Salary"/>
                            </div>
                            <button onClick={(e) => handleSearch(e)} type="submit" className="btn btn-primary">Search</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="list-group">
                <legend>Results:</legend>
                <table className="table table-hover table-dark">
                    <thead>
                    <tr className="bg-primary">
                        <th scope="col">Agent ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Salary</th>
                    </tr>
                    </thead>
                    <tbody>
                    {searchCompleted && agents && agents.map(agent => {
                        return (
                            <tr key={agent.agentid}>
                                <td>{agent.agentid}</td>
                                <td>{agent.aname}</td>
                                <td>{formatDollar(agent.salary)}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CompensationSearch