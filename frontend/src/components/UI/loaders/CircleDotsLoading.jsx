import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import classes from "./CircleLoading.module.css"

const CircleDotsLoading = ({size, color, speed}) => {
    return (
        <div style={{width: size, height: size}}>
            <div style={{"--uib-speed": speed, "--uib-color": color}} className={classes.threeBody}>
                <div className={classes.threeBodyDot}></div>
                <div className={classes.threeBodyDot}></div>
                <div className={classes.threeBodyDot}></div>
            </div>
        </div>
    );
};

export default CircleDotsLoading;