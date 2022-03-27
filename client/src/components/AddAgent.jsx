import React, {useState} from "react";

const AddAgent = () => {
    const [agentid, setAgentid] = useState("");
    const [name, setName] = useState("");
    const [salary, setSalary] = useState("");
    const [email, setEmail] = useState("");
    const [phonenum, setPhonenum] = useState("");

    return (
        <div className="mb-4">
            <form action="">
                <div className="form-row">
                    <div className="col">
                        <input
                            value={agentid}
                            onChange={e => setAgentid(e.target.value)}
                            type="number"
                            className="form-control"
                            placeholder="Agent ID"/>
                    </div>
                    <div className="col">
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type="text" c
                            className="form-control"
                            placeholder="Name"/>
                    </div>
                    <div className="col">
                        <input value={salary}
                               onChange={e => setSalary(e.target.value)}
                               type="number"
                               className="form-control"
                               placeholder="Salary"/>
                    </div>
                    <div className="col">
                        <input value={email}
                               onChange={e => setEmail(e.target.value)}
                               type="text"
                               className="form-control"
                               placeholder="Email"/>
                    </div>
                    <div className="col">
                        <input value={phonenum}
                               onChange={e => setPhonenum(e.target.value)}
                               type="text"
                               className="form-control"
                               placeholder="Phone Number"/>
                    </div>
                    <button className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddAgent