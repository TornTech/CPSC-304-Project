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
    try {
        const results = await db.query("SELECT * FROM agent");
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                agents: results.rows,
            },
        })
    } catch (err) {
        console.log(err);
        res.status(400).send("Bad request");
    }
});

// Get an agent
app.get("/api/agents/:agentID", async (req, res) => {
    try {
        const {agentID} = req.params;
        const results = await db.query(`SELECT *
                                        FROM agent
                                        WHERE agentid = $1`, [agentID]);

        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                agent: results.rows[0],
            },
        })
    } catch (err) {
        console.log(err);
        res.status(400).send("Bad request");
    }
})

// Create an agent
app.post("/api/agents", async (req, res) => {
    try {
        const {agentID, salary, name, email, phoneNum} = req.body;

        const results = await db.query(`INSERT INTO agent (agentid, salary, name, email, phonenum) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`, [agentID, salary, name, email, phoneNum]);

        res.status(201).json({
            status: "success",
            data: {
                agent: results.rows[0],
            },
        })
    } catch (err) {
        console.log(err);
        res.status(400).send("Duplicate agentID");
    }
})

// Update an agent
app.put("/api/agents/:agentID", async (req, res) => {
    try {
        const {agentID} = req.params;
        const {salary, name, email, phoneNum} = req.body;

        const results = await db.query(`UPDATE agent 
            SET salary = $2, name = $3, email = $4, phonenum = $5 
            WHERE agentid = $1 RETURNING *`,
            [agentID, salary, name, email, phoneNum])

        res.status(200).json({
            status: "success",
            data: {
                agent: results.rows[0],
            },
        })
    } catch (err) {
        console.log(err);
        res.status(400).send("Unable to update");
    }

})

// Delete an agent
app.delete("/api/agents/:agentID", async (req, res) => {
    try {
        const {agentID} = req.params;
        await db.query(`DELETE FROM agent WHERE agentid = $1`, [agentID]);
        res.status(204).json({
            status: "success"
        })
    } catch (err) {
        console.log(err);
        res.status(400).send("Unable to delete");
    }
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});