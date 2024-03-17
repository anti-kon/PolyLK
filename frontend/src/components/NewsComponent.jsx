import React, {useState} from 'react';
import LineImagesGallery from "./UI/images_gallery/LineImagesGallery/LineImagesGallery";

const NewsComponent = (props) => {

    const maxTextLength = 256;

    const isNeedAdapt = (inputText) => {
        return inputText.length > maxTextLength;
    }

    const adaptText = (inputText) => {
        let lastWordIndex = inputText.slice(0, (maxTextLength + 1)).lastIndexOf(' ');
        lastWordIndex = lastWordIndex > maxTextLength ? maxTextLength : lastWordIndex;
        return isNeedAdapt(inputText) ? inputText.slice(0, lastWordIndex) + '...' : inputText;
    }

    const [text, setText] = useState(adaptText(props.children));
    const [isFullTextVisible, setIsFullTextVisible] = useState(false);

    const showButton = isNeedAdapt(props.children);

    return (
        <div className={'news-body'}>
            <pre className={'news-text'}>{text}</pre>
            {showButton && (
                !isFullTextVisible ?
                    <button
                        className={'news-show-more'}
                        onClick={() => {setText(props.children);
                                        setIsFullTextVisible(true)}}>
                        Показать ещё
                    </button> :
                    <button
                        className={'news-show-more'}
                        onClick={() => {setText(adaptText(props.children));
                                        setIsFullTextVisible(false)}}>
                        Скрыть
                    </button>
            )}
            <LineImagesGallery images={props.images} id={props.id}/>
        </div>
    );
};

export default NewsComponent;