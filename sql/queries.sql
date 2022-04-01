/* SELECTION:  List the names of agents and their salaries for employees who have a salary greater than 50,000 */
SELECT AName, Salary
FROM Agent
WHERE Salary > 50000;

/* PROJECTION:  List the Agent ID, agent name, salary, and email of all agents in the database */
SELECT agentid, aname, salary, email
FROM agent
ORDER BY agentid;

/* JOIN:  List the training modules completed by agent 1 */
SELECT T.modulenum, T.tlength, T.tname, TC.completiondate
FROM Agent as A, Training as T, TrainingCompletion as TC
WHERE A.AgentID = TC.AgentID AND T.ModuleNum = TC.ModuleNum AND A.agentid = 1;

/* AGGREGATION: In English: List the name and salary of the agent who earns the highest agent salary in the company */
SELECT AName, Salary AS HighestSalary
FROM Agent
WHERE Salary = 
  (SELECT MAX (Salary)
   FROM Agent);

/* NESTED AGGREGATION with GROUP BY:
Find the average salary earned by agents at each call centre that has at least 2 agents */
SELECT C.CallCentreID, C.ccaddress, C.managername, C.phonelinecount, AVG(Salary) as avg_salary
FROM Agent AS A, WorksIn AS W, CallCentres AS C
WHERE A.AgentID = W.AgentID AND W.CallCentreID = C.CallCentreID
GROUP BY W.CallCentreID, C.CallCentreID
HAVING 2 <= (SELECT COUNT(*)
             FROM WorksIn AS W2
             WHERE W.CAllCentreID = W2.CAllCentreID);

/* DIVISION: Find the agents who have completed all of the training modules */
SELECT agentid, AName, email, phonenum
  FROM Agent AS A
  WHERE NOT EXISTS
      ((SELECT T.ModuleNum
      FROM Training AS T)
      EXCEPT
      (SELECT TC.ModuleNum
      FROM TrainingCompletion AS TC
      WHERE TC.AgentID = A.AgentID));
