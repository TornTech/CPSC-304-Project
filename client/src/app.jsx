import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./routes/Home";
import AgentDetailPage from "./routes/AgentDetailPage";
import AgentUpdatePage from "./routes/AgentUpdatePage";
import CompensationPage from "./routes/CompensationPage";
import {AgentsContextProvider} from "./context/AgentsContext";
import Navbar from "./components/navbar/Navbar";
import LocationsPage from "./routes/LocationsPage";
import {LocationsContextProvider} from "./context/LocationsContext";

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
                    <Route exact path="/compensation" element={<CompensationPage/>}/>
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