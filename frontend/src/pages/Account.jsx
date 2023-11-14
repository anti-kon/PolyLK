import React from 'react';
import SwitchBar from "../components/SwitchBar";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import "../styles/Account.css";

const Account = () => {
    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"account-page"}>
                <SwitchBar></SwitchBar>
            </div>
        </div>
    );
};

export default Account;