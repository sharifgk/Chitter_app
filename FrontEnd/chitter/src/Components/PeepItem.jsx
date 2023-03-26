import React from "react";

const PeepItem = ({ peep }) => {
    return (
        <li className="list-group-item">
            <p><strong>{peep.user.username}</strong> - {new Date(peep.createdAt).toLocaleDateString()}</p>
            <p>{peep.content}</p>
        </li>
    );
};

export default PeepItem;