import React from 'react';
import SwitchBar from "../components/SwitchBar";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import "../styles/BulletinBoard.css";

const BulletinBoard = () => {
    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"bulletin-board-page"}>
                <SwitchBar></SwitchBar>
            </div>
        </div>
    );
};

export default BulletinBoard;