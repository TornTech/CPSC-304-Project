import React, {useContext, useEffect, useState} from "react";
import {AgentsContext} from "../context/AgentsContext";
import api from "../apis/api";
import {formatDollar} from "../utils/utils";
import {useNavigate} from "react-router-dom";

const HighestPaidSearch = () => {

    const {agents, setAgents} = useContext(AgentsContext);
    let navigate = useNavigate();
    const [renderedYet, setRenderedYet] = useState(false);

    useEffect( () => {
        const fetchData = async() => {
            const highest_paid_response = await api.get("/stats/agents/highestpaid");
            const agents = highest_paid_response.data.data.highest_paid;
            setAgents(agents);
            setRenderedYet(true);
        }
        fetchData();
    }, [setAgents])

    const redirectToProfile = (e, agentid) => {
        e.stopPropagation();
        navigate(`/agents/${agentid}`);
    }

    return (
        <div className="card text-center">
            <div className="card-header">
                Highest Paid Agent{agents && agents.length > 1 ? "s" : ""}
            </div>
            <div className="card-body">
                <h3>{renderedYet && agents ? `Highest salary is ${formatDollar(agents[0].salary)} and is earned by:` : "Loading..."}</h3>
                <div className="col-md-3 col-sm-3 col-xs-3">&nbsp;</div>
                {renderedYet && agents && agents.map(agent => {
                    return (
                        <div key={agent.agentid}>
                            <h5 className="card-title">{agent.aname}</h5>
                            <button onClick={(e) => redirectToProfile(e, agent.agentid)} className="btn btn-info">Go to profile</button>
                            <div className="col-md-3 col-sm-3 col-xs-3">&nbsp;</div>
                        </div>
                        )
                })}
            </div>
        </div>
    )
}

export default HighestPaidSearch