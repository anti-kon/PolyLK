import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import classes from "./CircleLoading.module.css"

const CircleLoading = ({...props}) => {

    const ref = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(ref.current ? ref.current.clientWidth : 0);
        console.log({width: width,
            borderTop: "8px solid " + props.style.color,
            borderLeft: "8px solid " + props.style.color,
            height: props.style.height})
    }, [])

    return (
        <div ref={ref}
             style={{width: width,
                 borderTop: "8px solid " + props.style.color,
                 borderLeft: "8px solid " + props.style.color,
                 height: props.style.height}}
             className={classes.loading}
             {...props}></div>
    );
};

export default CircleLoading;