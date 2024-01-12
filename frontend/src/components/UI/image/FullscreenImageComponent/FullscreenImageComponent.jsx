import React, {useEffect, useState} from 'react';
import classes from "./FullscreenImageComponent.module.css";
import {BiSolidLeftArrow, BiSolidRightArrow} from "react-icons/bi";
import ImageComponent from "../ImageComponent/ImageComponent";

const FullscreenImageComponent = ({onClose, onChange, ...props}) => {
    const [image, setImage] = useState(props.image);

    useEffect(() => {
        setImage(props.image);
    }, [props.image])

    useEffect(() => {
        let div = document.createElement('div');

        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';

        document.body.append(div);
        const scrollWidth = div.offsetWidth - div.clientWidth;

        document.body.style.paddingRight = (scrollWidth + 'px');
        document.getElementById('major_header').style.width = 'calc(100vw - ' + scrollWidth + 'px)';
        document.getElementById('major_header').style.paddingRight = (scrollWidth + 'px');

        div.remove();

        document.body.style.overflowY = "hidden";
    })

    return (
        <div>
            <div
                className={classes.fullscreenImageBackground}
                onClick={() => {
                    document.body.style.overflowY = "scroll";
                    document.body.style.paddingRight = ('0px');
                    document.getElementById('major_header').style.width = "100%";
                    document.getElementById('major_header').style.paddingRight = "0";
                    onClose !== undefined && onClose();
                }}
                {...props}>
                <ImageComponent
                    className={classes.fullscreenImageContent}
                    image={image}
                />
            </div>
            {
                props.image_index !== undefined && props.image_index !== 0 &&
                <div
                    onClick={() => onChange(props.image_index - 1)}
                    style={{left: 0}}
                    className={classes.clickZone}>
                    <button>
                        <BiSolidLeftArrow/>
                    </button>
                </div>
            }
            {
                props.image_index !== undefined && props.gallery_size !== undefined &&
                props.image_index !== (props.gallery_size - 1) &&
                <div
                    onClick={() => onChange(props.image_index + 1)}
                    style={{right: 0}}
                    className={classes.clickZone}>
                    <button>
                        <BiSolidRightArrow/>
                    </button>
                </div>
            }
        </div>
    );
};

export default FullscreenImageComponent;