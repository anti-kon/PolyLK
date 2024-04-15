import React, {useLayoutEffect, useState} from 'react';
import SwitchBar from "../components/SwitchBar";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import "../styles/AppointmentsList.css";
import ContentBox from "../components/UI/content_boxes/content_box/ContentBox";
import {useNavigate} from "react-router-dom";
import MajorFooter from "../components/UI/footers/major_footer/MajorFooter";

const AppointmentsList = () => {
    const navigate = useNavigate();
    const [pageWidth, setPageWidth] = useState(0);
    useLayoutEffect(() => {
        setPageWidth(window.innerWidth);
        function handleWindowResize() {
            setPageWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"appointments-page"}>
                {pageWidth > 570 && <SwitchBar></SwitchBar> }
                <div className={"appointments-section-list"}>
                    <ContentBox style={{display: "flex", marginBottom: "20px"}}
                                onClick={() => {navigate("./laundry-appointment");}}>
                        <label className={"appointments-section-label"}>Очередь на стирку</label>
                    </ContentBox>
                    <ContentBox style={{display: "flex", marginBottom: "20px"}}
                                onClick={() => {
                                    navigate("./0JfQsNC_0LjRgdGMINC90LAg0LTQtdC30LjQvdGB0LXQutGG0LjRjg");
                                }}>
                        <label className={"appointments-section-label"}>Запись на дезинсекцию</label>
                    </ContentBox>
                    <ContentBox style={{display: "flex", marginBottom: "20px"}}
                                onClick={() => {navigate("./0JfQsNC_0LjRgdGMINC90LAg0YDQtdC80L7QvdGC");}}>
                        <label className={"appointments-section-label"}>Запись на ремонт</label>
                    </ContentBox>
                    <ContentBox style={{display: "flex", marginBottom: "20px"}}
                                onClick={() => {navigate("./my-appointments");}}>
                        <label className={"appointments-section-label"}>Мои записи</label>
                    </ContentBox>
                </div>
            </div>
            {pageWidth <= 570 && <MajorFooter /> }
        </div>
    );
};

export default AppointmentsList;