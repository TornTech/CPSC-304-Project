/* SELECTION:  List the names of agents and their salaries for employees who have a salary greater than 50,000 */
SELECT AName, Salary
FROM Agent
WHERE Salary > 50000;

/* PROJECTION:  List the CallCentreID, address, and manager name of all call centres in the database */
SELECT CallCentreID, CCAddress, ManagerName
FROM CallCentres;

/* JOIN:  List the training modules completed by agent 1 */
SELECT T.modulenum, T.tlength, T.tname, TC.completiondate
FROM Agent as A, Training as T, TrainingCompletion as TC
WHERE A.AgentID = TC.AgentID AND T.ModuleNum = TC.ModuleNum AND A.agentid = 1;

/* OLD JOIN: Join the Agent, Training, and TrainingCompletion tables to find the names and emails of the agents who have completed the training module named ‘Handling Difficult Customers’ 
SELECT T.modulenum, T.tlength, T.tname
FROM Agent as A, Training as T, TrainingCompletion as TC
WHERE A.AgentID = TC.AgentID AND T.ModuleNum = TC.ModuleNum AND A.agentid = 2;
*/

/* AGGREGATION: In English: List the name and salary of the agent who earns the highest agent salary in the company */
SELECT AName, Salary AS HighestSalary
FROM Agent
WHERE Salary = 
  (SELECT MAX (Salary)
   FROM Agent);

/* NESTED AGGREGATION with GROUP BY:
For each call centre (listed by their ID), list the average salary earned by the agents who work in that call centre */
SELECT C.CallCentreID, C.ccaddress, C.managername, C.phonelinecount, AVG(Salary) as avg_salary
FROM Agent AS A, WorksIn AS W, CallCentres as C
WHERE A.AgentID = W.AgentID AND W.callcentreid = C.callcentreid
GROUP BY C.CallCentreID;


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
