import React from "react";

const PeepItem = ({ peep }) => {
    return (
        <li className="list-group-item">
            <p><strong>{peep.user}</strong> - {new Date(peep.timestamp).toLocaleDateString()}</p>
            <p>{peep.content}</p>
        </li>
    );
};

export default PeepItem;