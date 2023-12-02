import React from 'react';
import SwitchBar from "../components/SwitchBar";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import "../styles/Account.css";
import AccountComponent from "../components/AccountComponent";

const Account = () => {
    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"account-page"}>
                <SwitchBar></SwitchBar>
                <AccountComponent userName={"UserName"} style={{margin: "0 10px 0 20px"}}></AccountComponent>
            </div>
        </div>
    );
};

export default Account;