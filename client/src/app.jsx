import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./routes/Home";
import AgentDetailPage from "./routes/AgentDetailPage";
import AgentUpdatePage from "./routes/AgentUpdatePage";
import HighestPaidPage from "./routes/HighestPaidPage";
import {AgentsContextProvider} from "./context/AgentsContext";
import Navbar from "./components/navbar/Navbar";
import LocationsPage from "./routes/LocationsPage";
import {LocationsContextProvider} from "./context/LocationsContext";
import QualificationsPage from "./routes/QualificationsPage";
import CompensationPage from "./routes/CompensationPage";
import ModuleCompletionPage from "./routes/ModuleCompletionPage";

const App = () => {
    return (
    <AgentsContextProvider>
        <Router>
            <Navbar/>
            <div className="container">
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/agents/:id" element={<AgentDetailPage/>}/>
                    <Route exact path="/agents/:id/update" element={<AgentUpdatePage/>}/>
                    <Route exact path="/highestpaid" element={<HighestPaidPage/>}/>
                    <Route exact path="/qualifications" element={<QualificationsPage/>}/>
                    <Route exact path="/compensation" element={<CompensationPage/>}/>
                    <Route exact path="/modulecompletion" element={<ModuleCompletionPage/>}/>

                    <Route exact path="/locations" element={
                        <LocationsContextProvider>
                            <LocationsPage/>
                        </LocationsContextProvider>
                    }/>
                </Routes>
            </div>
        </Router>
    </AgentsContextProvider>)
}

export default App;