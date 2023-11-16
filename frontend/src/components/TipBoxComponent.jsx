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
                {isContentVisible ?
                    <BiSolidUpArrow className={"tip-box-toggle-visibility-button"} /> :
                    <BiSolidDownArrow className={"tip-box-toggle-visibility-button"} />}
            </div>
            {isContentVisible && <p className={"tip-box-body"}>{props.children}</p>}
        </div>
    );
};

export default TipBoxComponent;