import React from "react";

const PeepForm = () => {

    return (
        <div className="container">
            <h2>Post a Peep</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="peep">Peep</label>
                    <textarea className="form-control" id="peep" rows='3'></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Post Peep</button>
            </form>
        </div>
    );
};

export default PeepForm;