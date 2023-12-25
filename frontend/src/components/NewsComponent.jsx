import React, {useState} from 'react';

const NewsComponent = (props) => {

    const maxTextLength = 256;

    const isNeedAdopt = (inputText) => {
        return inputText.length > maxTextLength;
    }

    const adoptText = (inputText) => {
        let lastWordIndex = inputText.slice(0, (maxTextLength + 1)).lastIndexOf(' ');
        lastWordIndex = lastWordIndex > maxTextLength ? maxTextLength : lastWordIndex;
        return isNeedAdopt(inputText) ? inputText.slice(0, lastWordIndex) + '...' : inputText;
    }

    const [text, setTest] = useState(adoptText(props.children));
    const [isFullTextVisible, setIsFullTextVisible] = useState(false);

    const showButton = isNeedAdopt(props.children);

    return (
        <div className={'news-body'}>
            <p className={'news-text'}>{text}</p>
            {showButton && (
                !isFullTextVisible ?
                    <button
                        className={'news-show-more'}
                        onClick={() => {setTest(props.children);
                                        setIsFullTextVisible(true)}}>
                        Показать ещё
                    </button> :
                    <button
                        className={'news-show-more'}
                        onClick={() => {setTest(adoptText(props.children));
                                        setIsFullTextVisible(false)}}>
                        Скрыть
                    </button>
            )}
        </div>
    );
};

export default NewsComponent;