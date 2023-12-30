import {React, useEffect, useLayoutEffect, useRef, useState} from 'react';
import classes from './MajorButton.module.css'

const MajorButton = ({children, disabled=false, ...props}) => {
    const ref = useRef(null);

    const [isDisabled, setIsDisabled] = useState(disabled);
    const [height, setHeight] = useState(0);

    useEffect(() => {setIsDisabled(disabled)}, [disabled]);

    useLayoutEffect(() => {
        setHeight(ref.current ? ref.current.clientHeight : 0);
    }, []);

    useEffect(() => {
        function handleWindowResize() {
            setHeight(ref.current ? ref.current.clientHeight : 0);
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <button ref={ref} style={{borderRadius: height / 7}}
                className={isDisabled ? classes.majorButtonDisabled : classes.majorButton}
                disabled={isDisabled}
                {...props}>
            {children}
        </button>
    );
};

export default MajorButton;