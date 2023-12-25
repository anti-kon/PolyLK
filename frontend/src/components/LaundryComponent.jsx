import React from 'react';
import {BiDotsVerticalRounded, BiSolidWasher} from "react-icons/bi";
import LinearTimeline from "./UI/timelines/line_timeline/LinearTimeline";

const LaundryComponent = (props) => {
    return (
        <div>
            <button><BiDotsVerticalRounded /></button>
            <BiSolidWasher/>
            <LinearTimeline startHour={6} endHour={23} duration={props.duration}></LinearTimeline>
        </div>
    );
};

export default LaundryComponent;