import React, {useEffect, useState} from 'react';
import classes from "./ImageComponent.module.css";
import CircleDotsLoading from "../../loaders/CircleDotsLoading";
import FullscreenImageBackground from  "../FullscreenImageComponent/FullscreenImageComponent"

const ImageComponent = ({blurFill=false, ...props}) => {
    const [isProcessed, setIsProcessed] = useState(true);

    useEffect( () => {
        const img = new Image();
        img.onload = () => {
            setIsProcessed(false);
        }
        img.src = props.image;
    }, [props.image])

    return (
        <div className={classes.imageBody} {...props}>
            {isProcessed ?
                <CircleDotsLoading size={"60px"} color={"#68a3a3"}/> :
                <div className={classes.imagePart}>
                    {
                        blurFill &&
                        <img
                            className={classes.imageBackground}
                            src={props.image}/>
                    }
                    <img
                        className={classes.imageContent}
                        src={props.image}/>
                </div>
            }
        </div>
    );
};

export default ImageComponent;