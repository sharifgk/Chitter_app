import React from "react";
import PeepItem from "./PeepItem";

const PeepList = () => {
    const peeps = [
        {
            id: `1`,
            user: `Bob`,
            content: `Hello World!`,
            timestamp: `2023-03-14T10:30:00.000Z`,
        },
        {
            id: `2`,
            user: `Yeet`,
            content: `Wow amazing things!`,
            timestamp: `2023-03-14T10:00:00.000Z`,
        },
    ];

    return (
        <div className="container">
            <h2>Peeps</h2>
            <ul className="list-group">
                {peeps.map((peep) => (
                    <PeepItem key={peep.id} peep={peep} />
                ))}
            </ul>
        </div>
    );
};

export default PeepList;