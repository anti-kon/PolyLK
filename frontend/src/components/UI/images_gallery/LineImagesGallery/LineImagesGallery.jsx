import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import ImageComponent from "../../image/ImageComponent/ImageComponent";
import classes from "./LineImagesGallery.module.css";
import {BiSolidLeftArrow, BiSolidRightArrow} from "react-icons/bi";
import FullscreenImageBackground from "../../image/FullscreenImageComponent/FullscreenImageComponent";

const LineImagesGallery = (props) => {
    const [images, setImages] = useState(props.images);
    const [imageIndex, setImageIndex] = useState(0);
    const [width, setWidth] = useState(0);
    const [isLeftArrowShow, setIsLeftArrowShow] = useState(false);
    const [isRightArrowShow, setIsRightArrowShow] = useState(false);
    const [isShowBigImage, setIsShowBigImage] = useState(false);

    const ref = useRef(null);

    useLayoutEffect(() => {
        setWidth(ref.current ? ref.current.clientWidth : 0);
    }, []);

    useEffect(() => {
        function handleWindowResize() {
            setWidth(ref.current ? ref.current.clientWidth : 0);
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


    const getMargin = (index) => {
        let margin = (width - Math.min(width - 20, 520)) / 2;
        if (index > 0) {
            margin -= (Math.min(width - 20, 520)) * (index);
        }
        console.log(margin, width)
        return width > 0 ? margin : undefined;
    }

    const isDotShowing = (curIndex, dotIndex) => {
        const leftLimit = -2 - ((2 - ((images.length - 1) - imageIndex)) > 0 ?
            (2 - ((images.length - 1) - imageIndex)) : 0);
        const rightLimit = 2 + ((2 - curIndex) > 0 ? (2 - curIndex) : 0);
        return leftLimit <= (dotIndex - curIndex) && (dotIndex - curIndex)  <= rightLimit;
    }

    return (
        <div>
            <div style={props.style} ref={ref} className={classes.lineImagesGallery}>
                <div className={classes.lineImagesGalleryBody}>
                    <div
                        style={getMargin(imageIndex) !== undefined ? {
                            marginLeft: getMargin(imageIndex) + "px",
                            transition: "0.5s ease-in"} : {}}
                        className={classes.lineImagesGalleryBand}>
                        {images.map(image =>
                            <ImageComponent
                                style={{width: width - 30, height: width - 30}}
                                blurFill={true}
                                onClick={() => setIsShowBigImage(true)}
                                id={image.id}
                                key={image.id}
                                image={image}
                                gallery_size={images.length}
                            />
                        )}
                    </div>
                    {imageIndex !== 0 &&
                        <div
                            onMouseOver={() => setIsLeftArrowShow(true)}
                            onMouseOutCapture={() => setIsLeftArrowShow(false)}
                            style={{width: Math.max(50, ((width - 520) / 2) - 5) + "px", left: 0}}
                            className={classes.clickZone}
                            onClick={() => {setImageIndex(imageIndex - 1);
                                setIsLeftArrowShow(false);}}>
                            {isLeftArrowShow &&
                                <button
                                    onClick={() => {setImageIndex(imageIndex - 1);
                                        setIsLeftArrowShow(false);}}
                                    className={classes.arrowButton}>
                                    <BiSolidLeftArrow/>
                                </button>
                            }
                        </div>
                    }
                    {imageIndex !== (images.length - 1) &&
                        <div
                            onMouseOver={() => setIsRightArrowShow(true)}
                            onMouseOutCapture={() => setIsRightArrowShow(false)}
                            style={{width: Math.max(50, ((width - 520) / 2) - 5) + "px", right: 0}}
                            className={classes.clickZone}
                            onClick={() => {setImageIndex(imageIndex + 1);
                                setIsLeftArrowShow(false);}}>
                            {isRightArrowShow &&
                                <button
                                    onClick={() => {setImageIndex(imageIndex + 1);
                                        setIsRightArrowShow(false);}}
                                    className={classes.arrowButton}>
                                    <BiSolidRightArrow/>
                                </button>
                            }
                        </div>
                    }
                </div>
                {
                    images.length > 1 &&
                    <div className={classes.lineImagesGalleryFooter}>
                        <div className={classes.lineImagesGallerySwitchPanel}>
                            <div
                                style={{marginLeft: ((238 - 34 * Math.min(images.length, 7)) / 2) + (- 34 * (imageIndex - 2 > 0 ? imageIndex < images.length - 2 ?
                                        imageIndex - 2 : images.length - 5 : 0)) + "px"}}
                                className={classes.lineImagesGallerySwitchBand}>
                                {images.map(image =>
                                    <div key={image.id} className={classes.switchDotBox}>
                                        <input
                                            key={image.id}
                                            checked={imageIndex === image.id}
                                            value={image.id}
                                            onChange={value => setImageIndex(parseInt(value.target.value))}
                                            id={"image" + image.id}
                                            name={"imageGallery" + props.id}
                                            type={"radio"}
                                            className={ isDotShowing(imageIndex, image.id) ?
                                                classes.switchDot : classes.switchDotHide }>
                                        </input>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                }
            </div>
            {
                isShowBigImage &&
                <FullscreenImageBackground
                    onClose={() => {setIsShowBigImage(false);}}
                    onChange={(newValue) => {setImageIndex(newValue)}}
                    image_index={imageIndex}
                    image={images[imageIndex]}
                    gallery_size={images.length}>
                </FullscreenImageBackground>
            }
        </div>
    );
};

export default LineImagesGallery;