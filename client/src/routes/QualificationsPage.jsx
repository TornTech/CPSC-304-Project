import React from "react";
import QualifiedAgentList from "../components/QualifiedAgentList";

const QualificationsPage = () => {
    return (
        <div>
            <h1 className="text-center">Most Qualified Agents</h1>
            <h5 className="text-center">Agents that have completed every single training module:</h5>
            <QualifiedAgentList />
        </div>
    )
}

export default QualificationsPage