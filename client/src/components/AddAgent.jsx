import React from "react";

const AddAgent = () => {
    return (
        <div className="mb-4">
            <form action="">
                <div className="form-row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Agent ID"/>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Name"/>
                    </div>
                    <button className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddAgent