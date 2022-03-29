import React, {useContext, useEffect, useState} from "react";
import api from "../apis/api";

const LocationsList = () => {

    const [trainings, setTrainings] = useState([]);

    useEffect(async () => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/modulecompletion`);
                setTrainings(response.data.data.training_completion);
            } catch (err) {

            }
        }
        fetchData();
    }, [])

    return (
        <div >
            <table className="table table-hover table-dark">
                <thead>
                <tr className="bg-primary">
                    <th scope="col">AgentID</th>
                    <th scope="col">Agent Name</th>
                    <th scope="col">Module Name</th>
                    <th scope="col">Completion Date</th>
                </tr>
                </thead>
                <tbody>
                    {trainings && trainings.map((training => {
                        return (
                            <tr key={training.agentid + "-" + training.modulenum}>
                                <td>{training.agentid}</td>
                                <td>{training.aname}</td>
                                <td>{training.tname}</td>
                                <td>{new Date(training.completiondate).toDateString()}</td>
                            </tr>
                        )
                    }))}
                </tbody>
            </table>
        </div>
    )
}

export default LocationsList;