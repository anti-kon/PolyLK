import React, {useState} from 'react';
import {BiSolidDownArrow, BiSolidUpArrow} from "react-icons/bi";
import "../styles/FAQ.css"

const TipBoxComponent = (props) => {
    const [isContentVisible, setIsContentVisible] = useState(false);

    return (
        <div className={"tip-box"}>
            <div onClick={() => {setIsContentVisible(!isContentVisible)}}
                 className={"tip-box-header"}>
                <label className={"tip-box-label"}>{props.label}</label>
                <button className={"tip-box-arrow-button"} onClick={() => {setIsContentVisible(!isContentVisible)}}>
                    {isContentVisible ?
                        <BiSolidUpArrow className={"tip-box-toggle-visibility-icon"} /> :
                        <BiSolidDownArrow className={"tip-box-toggle-visibility-icon"} />}
                </button>
            </div>
            {isContentVisible && <pre className={"tip-box-body"}>{props.children}</pre>}
        </div>
    );
};

export default TipBoxComponent;