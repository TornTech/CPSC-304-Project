require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");
const app = express();

// Allows API requests from a separate domain
app.use(cors());

// Used to console log API requests for development purposes
app.use(morgan("dev"));

app.use(express.json());

// Get all agents
app.get("/api/agents", async (req, res) => {
    try {
        const results = await db.query("SELECT agentid, aname, salary, email FROM agent ORDER BY agentid");
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

        const results = await db.query(`INSERT INTO agent (agentid, salary, aname, email, phonenum) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`, [agentID, salary, name, email, phoneNum]);

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
            SET salary = $2, aname = $3, email = $4, phonenum = $5 
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

// Get all training modules completed by agent
app.get("/api/agents/:agentID/trainings", async (req, res) => {
    try {
        const {agentID} = req.params;
        const results = await db.query(`SELECT T.modulenum, T.tlength, T.tname, TC.completiondate
                                            FROM Agent as A, Training as T, TrainingCompletion as TC
                                            WHERE A.AgentID = TC.AgentID AND T.ModuleNum = TC.ModuleNum AND A.agentid = $1`,[agentID]);
        res.status(200).json({
                status: "success",
                results: results.rows.length,
                data: {
                    training_completed: results.rows,
                },
            }
        )
    } catch (err) {
        console.log(err);
        res.status(400).send("Bad request");
    }
})

app.delete("/api/agents/:agentID/trainings/:modulenum", async (req, res) => {
    try {
        const {agentID, modulenum} = req.params;
        const results = await db.query(`
            DELETE FROM trainingcompletion WHERE agentid = $1 AND modulenum = $2`,
            [agentID, modulenum])

        res.status(204).json({
            status: "success"
        })
    } catch (err) {
        console.log(err);
        res.status(400).send("Unable to delete");
    }
})

// Add new training module completion to an agent
app.post("/api/agents/trainings", async (req, res) => {
    try {
        const {agentid, modulenum, completion_date} = req.body;

        const results = await db.query(`INSERT INTO trainingcompletion (agentid, modulenum, completiondate) 
            VALUES ($1, $2, $3)
            RETURNING *`, [agentid, modulenum, completion_date]);
        console.log(results);

        const combinedResults = await db.query(
            `SELECT A.agentid, TC.modulenum, T.tname, T.tlength, TC.completiondate 
            FROM Agent as A, Training as T, TrainingCompletion as TC
            WHERE A.AgentID = TC.AgentID AND T.ModuleNum = TC.ModuleNum AND TC.modulenum=$1 AND A.agentid = $2`,
            [modulenum,agentid])

        console.log(combinedResults);

        res.status(201).json({
            status: "success",
            data: {
                training_added: combinedResults.rows[0],
            },
        })
    } catch (err) {
        console.log(err);
        res.status(400).send("Bad request");
    }
})

// Find the highest paid agent
app.get("/api/stats/agents/highestpaid", async (req, res) => {
    try {
        const results = await db.query(
            `SELECT AName, agentid, Salary
            FROM Agent
            WHERE Salary =
                (SELECT MAX (Salary)
            FROM Agent)`);

        res.status(200).json({
                status: "success",
                results: results.rows.length,
                data: {
                    highest_paid: results.rows
                },
            }
        )
    } catch (err) {
        console.log(err);
        res.status(400).send("Bad request");
    }
})

// Find agents making over x salary
app.get("/api/stats/agents/compensation", async (req, res) => {
    try {
        const salary = Number(req.query.salary);

        const results = await db.query(
            `SELECT AName, agentid, Salary
            FROM Agent
            WHERE Salary >= $1`,
            [salary]);

        console.log(results);
        res.status(200).json({
                status: "success",
                results: results.rows.length,
                data: {
                    agents: results.rows
                },
            }
        )
    } catch (err) {
        console.log(err);
        res.status(400).send("Bad request");
    }
})

app.get("/api/locations", async (req, res) => {
    try {
        const results = await db.query(`
            SELECT C.CallCentreID, C.ccaddress, C.managername, C.phonelinecount, AVG(Salary) as avg_salary
            FROM Agent AS A, WorksIn AS W, CallCentres AS C
            WHERE A.AgentID = W.AgentID AND W.CallCentreID = C.CallCentreID
            GROUP BY W.CallCentreID, C.CallCentreID
            HAVING 2 <= (SELECT COUNT(*)
                FROM WorksIn AS W2
                WHERE W.CAllCentreID = W2.CAllCentreID)`);

        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                locations: results.rows
            },
        });

    } catch (err) {
        console.log(err);
        res.status(400).send("Bad request");
    }
})

app.get("/api/qualifications", async (req, res) => {
    const results = await db.query(`
        SELECT agentid, AName, email, phonenum
        FROM Agent AS A
        WHERE NOT EXISTS
            ((SELECT T.ModuleNum
            FROM Training AS T)
            EXCEPT
            (SELECT TC.ModuleNum
            FROM TrainingCompletion AS TC
            WHERE TC.AgentID = A.AgentID))`)

    res.status(200).send({
        status: "success",
        results: results.rows.length,
        data: {
            qualified_agents: results.rows
        },
    });
})

// Get list of all training completions
app.get("/api/modulecompletion", async (req, res) => {
    try {
        const results = await db.query(`
            SELECT A.agentid, A.aname, T.tname, T.modulenum, TC.completiondate
            FROM Agent A, Training T, trainingcompletion TC
            WHERE A.agentid = TC.agentid AND TC.modulenum = T.modulenum`);
        res.status(200).send({
            status: "success",
            results: results.rows.length,
            data: {
                training_completion: results.rows
            },
        });
    } catch (err) {
        console.log(err);
        res.status(400).send("Bad request");
    }
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});