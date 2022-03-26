require("dotenv").config();
const express = require("express");
const db = require("./db");
const morgan = require("morgan");
const app = express();

// Used to console log API requests for development purposes
app.use(morgan("dev"));

app.use(express.json());

// Get all agents
app.get("/api/agents", async (req, res) => {
    const results = await db.query("SELECT * FROM agent");
    console.log(results);
    res.status(200).json({
        status: "success",
        data: {
            agents: ['Ben Torn', 'Alex'],
        },
    })
});

// Get an agent
app.get("/api/agents/:agentID", (req, res) => {
    const {agentID} = req.params;
    console.log(agentID);

    res.status(200).json({
        status: "success",
        data: {
            agents: ['Ben Torn', 'Alex'],
        },
    })
})

// Create an agent
app.post("/api/agents", (req, res) => {
    console.log(req.body);

    res.status(201).json({
        status: "success",
        data: {
            agents: ['Ben Torn', 'Alex'],
        },
    })
})

// Update an agent
app.put("/api/agents/:agentID", (req, res) => {
    console.log(req.params.agentID);
    console.log(req.body);

    res.status(200).json({
        status: "success",
        data: {
            agents: ['Ben Torn', 'Alex'],
        },
    })
})

// Delete an agent
app.delete("/api/agents/:agentID", (req, res) => {
    res.status(204).json({
        status: "success"
    })
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});