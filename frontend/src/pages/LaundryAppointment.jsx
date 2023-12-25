import React from 'react';
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import SwitchBar from "../components/SwitchBar";
import ContentBox from "../components/UI/content_boxes/content_box/ContentBox";
import NewsComponent from "../components/NewsComponent";
import LaundryListComponent from "../components/LaundryListComponent";

const LaundryAppointment = () => {
    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"appointments-page"}>
                <SwitchBar></SwitchBar>
                <ContentBox>
                    <LaundryListComponent></LaundryListComponent>
                </ContentBox>
            </div>
        </div>
    );
};

export default LaundryAppointment;