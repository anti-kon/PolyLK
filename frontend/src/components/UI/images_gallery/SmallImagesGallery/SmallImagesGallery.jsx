import React, {useEffect, useLayoutEffect, useState} from 'react';
import { BiXCircle } from "react-icons/bi";
import classes from "./SmallImagesGallery.module.css";
import MiniImageComponent from "../../image/MiniImageComponent/MiniImageComponent";
import FullscreenImageBackground from "../../image/FullscreenImageComponent/FullscreenImageComponent";

const SmallImagesGallery = (props) => {
    const [images, setImages] = useState([]);
    const [bigImage, setBigImage] = useState(undefined);
    const [isShowBigImage, setIsShowBigImage] = useState(false);

    useLayoutEffect(() => {
        let imagesWithId = [];
        for (let image_index = 0; image_index < props.images.length; image_index++)
            imagesWithId.push({id: image_index, image: props.images[image_index]});
        setImages(imagesWithId);
    }, [props.images])

    const zoomImage = (imageIndex) => {
        console.log(imageIndex);
        setBigImage({imageIndex: imageIndex, imageSrc: URL.createObjectURL(images[imageIndex].image)});
        setIsShowBigImage(true);
    }

    return (
        <div className={classes.smallImagesGallery}>
            {images.map((image) =>
                <div key={image.id} className={classes.imageMiniature}>
                    <MiniImageComponent onZoom={() => zoomImage(image.id)} src={image.image}/>
                    <button className={classes.deleteButton} onClick={() => props.onDelete(image.id)}>
                        <BiXCircle style={{margin: 0, padding: 0, width: "auto", maxWidth: "100%", height: "auto", maxHeight: "100%"}} />
                    </button>
                </div>
            )}
            {
                isShowBigImage &&
                <FullscreenImageBackground
                    onClose={() => {setIsShowBigImage(false);}}
                    onChange={(newValue) => {}}
                    image_index={0}
                    image={bigImage.imageSrc}
                    gallery_size={1}>
                </FullscreenImageBackground>
            }
        </div>
    );
};

export default SmallImagesGallery;