import React from 'react';
import SwitchBar from "../components/SwitchBar";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import "../styles/Queue.css";

const Queue = () => {
    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"queue-page"}>
                <SwitchBar></SwitchBar>
            </div>
        </div>
    );
};

export default Queue;