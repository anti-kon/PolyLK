import React, {useState} from 'react';

const AdvertisementComponent = (props) => {
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
        <div className={'advertisement-body'}>
            <p className={'advertisement-text'}>{text}</p>
            {showButton && (
                !isFullTextVisible ?
                    <button
                        className={'advertisement-show-more'}
                        onClick={() => {setTest(props.children);
                            setIsFullTextVisible(true)}}>
                        Показать ещё
                    </button> :
                    <button
                        className={'advertisement-show-more'}
                        onClick={() => {setTest(adoptText(props.children));
                            setIsFullTextVisible(false)}}>
                        Скрыть
                    </button>
            )}
            <div className={'advertisement-price-block'}>
                {props.moneyPrice !== null && <label>{props.moneyPrice}</label>}
                {props.moneyPrice !== null && props.alternativePrice !== null &&
                    <label className={'advertisement-spacer-price'}>/</label>}
                {props.alternativePrice !== null && <label>{props.alternativePrice}</label>}
            </div>
        </div>
    );
};

export default AdvertisementComponent;