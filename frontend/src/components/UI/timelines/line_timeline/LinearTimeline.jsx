import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import classes from "./LinearTimeline.module.css";

const LinearTimeline = ({startHour = 0, startMinute = 0,
                            endHour = 24,endMinute = 0,
                            duration, ...props}) => {
    const [isMouseHover, setIsMouseHover] = useState(false);
    const [localCoords, setLocalCoords] = useState({x: 0, y: 0});
    const [bogeyCenterHour, setBogeyCenterHour] = useState(0);
    const [bogeyCenterMinute, setBogeyCenterMinute] = useState(0);

    const [durationInPixels, setDurationInPixels] = useState(0);
    const [oneHourInPixels, setOneHourInPixels] = useState(0);
    const [oneMinuteInPixels, setOneMinuteInPixels] = useState(0);

    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;

    const ref = useRef(null);

    const handleMouseMove = event => {
        setLocalCoords({
            x: event.clientX - ref.current.offsetLeft < durationInPixels / 2  ?
                durationInPixels / 2 :
                event.clientX - ref.current.offsetLeft > ref.current.clientWidth - durationInPixels / 2 ?
                    ref.current.clientWidth - durationInPixels / 2 :
                    event.clientX - ref.current.offsetLeft,
            y: event.clientY - ref.current.offsetTop,
        });
        setBogeyCenterHour(Math.floor(localCoords.x / oneHourInPixels) + startHour);
        setBogeyCenterMinute(Math.floor((localCoords.x - (bogeyCenterHour - startHour) * oneHourInPixels) /
            oneMinuteInPixels));
        console.log(oneHourInPixels, oneMinuteInPixels);
    };

    useEffect(() => {
        setDurationInPixels(ref.current.clientWidth * (duration / (endTime - startTime)));
        const hour = ref.current.clientWidth / ((endTime - startTime) / 60);
        setOneHourInPixels(hour);
        setOneMinuteInPixels(hour / 60);

        const handleGlobalMouseMove = event => {
            setIsMouseHover(ref.current.offsetLeft < event.clientX &&
                            event.clientX < ref.current.offsetLeft + ref.current.clientWidth &&
                            ref.current.offsetTop < event.clientY &&
                            event.clientY < ref.current.offsetTop + ref.current.clientHeight);
        };
        window.addEventListener('mousemove', handleGlobalMouseMove);

        return () => {
            window.removeEventListener(
                'mousemove',
                handleGlobalMouseMove,
            );
        };
    }, []);

    return (
        <div className={classes.timelineBody}>
            <div style={{width: "100%", position: 'relative', height: "100%", display: "flex", alignItems: "center"}}
                 onMouseMove={handleMouseMove}
                 ref={ref}>
                <div style={{width: "100%", height: "0.2em", background: "#68a3a3"}}></div>
                <div style={{width: "0.2em", height: "100%", background: "#68a3a3", position: "absolute", left: 0}}></div>
                <div style={{width: "0.2em", height: "100%", background: "#68a3a3", position: "absolute", right: "-6px"}}></div>
                {isMouseHover &&
                    <div
                        className={classes.timelineBogey}
                        style={{width: (durationInPixels.toString() + "px"),
                            left: (localCoords.x - durationInPixels / 2)}}>
                    </div>}
            </div>
            <label>{bogeyCenterHour} : {bogeyCenterMinute}</label>
        </div>
    );
};

export default LinearTimeline;