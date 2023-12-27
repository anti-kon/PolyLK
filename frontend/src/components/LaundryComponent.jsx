import React, {useEffect, useState} from 'react';
import {BiDotsVerticalRounded, BiSolidDryer, BiSolidWasher} from "react-icons/bi";
import LinearTimeline from "./UI/timelines/line_timeline/LinearTimeline";

const LaundryComponent = (props) => {
    return (
        <div className={'laundry-component'}>
            <button className={"laundry-message-button"}><BiDotsVerticalRounded /></button>
            <div className={"laundry-icon"}>
                <label className={"laundry-num"}>{props.num}</label>
                {props.isDryer ?
                    <BiSolidDryer className={"laundry-logo"}/> :
                    <BiSolidWasher className={"laundry-logo"}/>}
            </div>
            <LinearTimeline startHour={6} endHour={23} duration={props.duration}></LinearTimeline>
        </div>
    );
};

export default LaundryComponent;