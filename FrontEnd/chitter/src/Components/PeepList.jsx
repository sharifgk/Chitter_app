import React, { useEffect, useState } from "react";
import PeepItem from "./PeepItem";
import { getAllPeeps } from "../Utils/api.js";

const PeepList = () => {
    const [peeps, setPeeps] = useState([]);

    useEffect(() => {
        const fetchPeeps = async () => {
           try {
               const fetchedPeeps = await getAllPeeps();
               if (Array.isArray(fetchedPeeps)) {
                   setPeeps(fetchedPeeps);
               } else {
                   console.log('fetched data is not an array:', fetchedPeeps);
               }
           } catch (error) {
               console.error('error fetching peeps', error);
           }
        }

        fetchPeeps();
    }, []);


    return (
        <div className="container">
            <h2>Timeline</h2>
            <ul className="list-group">
                {peeps.map((peep) => (
                    <PeepItem key={peep._id} peep={peep} />
                ))}
            </ul>
        </div>
    );
};

export default PeepList;