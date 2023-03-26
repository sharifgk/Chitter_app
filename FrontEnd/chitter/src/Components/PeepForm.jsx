import React, { useEffect, useState } from "react";
import { createPeep, getUserInfo } from "../Utils/api.js";

const PeepForm = ({ onPeepCreated }) => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const userInfo = await getUserInfo(token);
                setUserId(userInfo._id);
            }
        };
        fetchUserInfo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const content = e.target.elements.peep.value;

        if (userId) {
            await createPeep({ content, user: userId });
            onPeepCreated();
        }
    }

    return (
        <div className="container">
            <h2>Post a Peep</h2>
            <form onSubmit={handleSubmit}>
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