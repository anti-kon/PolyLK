import React from 'react';
import SwitchBar from "../components/SwitchBar";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import "../styles/FAQ.css";

const Faq = () => {
    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"faq-page"}>
                <SwitchBar></SwitchBar>
            </div>
        </div>
    );
};

export default Faq;