import React, {useLayoutEffect, useState} from 'react';
import classes from "./MiniImageComponent.module.css";
import {BiZoomIn} from "react-icons/bi";

const MiniImageComponent = (props) => {
    const [imageSrc, setImageSrc] = useState();
    const [isShowBigImage, setIsShowBigImage] = useState(false);

    useLayoutEffect(() => {
        if (props.src !== undefined)
            setImageSrc(URL.createObjectURL(props.src));
    }, [props.src]);


    return (
        <div className={classes.miniImageComponentBody}>
            <img className={classes.miniImageComponent} src={imageSrc}/>
            <button onClick={() => props.onZoom()} className={classes.zoom}>
                <BiZoomIn style={{width: "25px", height: "25px"}} />
            </button>
        </div>
    );
};

export default MiniImageComponent;