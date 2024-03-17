import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import classes from "./LinearTimeline.module.css";

const LinearTimeline = ({startHour = 0, startMinute = 0,
                            endHour = 24,endMinute = 0,
                            duration, ...props}) => {
    const busyTimeSlots = [{startHour: 9, startMinute: 0, endHour: 9, endMinute: 40},
                           {startHour: 10, startMinute: 0, endHour: 10, endMinute: 40},
                           {startHour: 11, startMinute: 20, endHour: 12, endMinute: 0},
                           {startHour: 12, startMinute: 10, endHour: 12, endMinute: 50},
                           {startHour: 13, startMinute: 10, endHour: 13, endMinute: 50},
                           {startHour: 14, startMinute: 0, endHour: 15, endMinute: 0},
                           {startHour: 17, startMinute: 0, endHour: 18, endMinute: 0}];

    const [isMouseHover, setIsMouseHover] = useState(false);
    const [localCoords, setLocalCoords] = useState({x: 0, y: 0});
    const [bogeyCenterHour, setBogeyCenterHour] = useState(0);
    const [bogeyCenterMinute, setBogeyCenterMinute] = useState(0);

    const [durationInPixels, setDurationInPixels] = useState(0);
    const [oneHourInPixels, setOneHourInPixels] = useState(0);
    const [oneMinuteInPixels, setOneMinuteInPixels] = useState(0);

    const [invalidZones, setInvalidZones] = useState([]);

    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;

    const ref = useRef(null);

    useEffect(() => setDurationInPixels(
        ref.current.clientWidth * (duration / (endTime - startTime))),
        [duration]);

    useLayoutEffect(() => {
        for (let index = 0; index < (busyTimeSlots.length - 1); index++) {
            if ((busyTimeSlots[index + 1].startHour - busyTimeSlots[index].endHour) * 60 +
                 busyTimeSlots[index + 1].startMinute - busyTimeSlots[index].endMinute < duration) {
                setInvalidZones([invalidZones.push(
                    {startHour: busyTimeSlots[index].endHour,
                        startMinute: busyTimeSlots[index].endMinute,
                        endHour: busyTimeSlots[index + 1].startHour,
                        endMinute: busyTimeSlots[index + 1].startMinute})]);
                console.log((busyTimeSlots[index + 1].startHour - busyTimeSlots[index].endHour) * 60 +
                    busyTimeSlots[index + 1].startMinute - busyTimeSlots[index].endMinute, duration);
            }
        }
        console.log(invalidZones);
    }, [duration]);

    const zeroPad = (num, places) => String(num).padStart(places, '0');

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
            <div style={{
                width: "100%",
                position: 'relative',
                height: "100%",
                display: "flex",
                alignItems: "center"}}
                 onMouseMove={handleMouseMove}
                 ref={ref}>
                <div style={{width: "100%", height: "0.2em", background: "#68a3a3"}}></div>
                <div style={{width: "0.2em", height: "100%", background: "#68a3a3", position: "absolute", left: 0}}></div>
                <div style={{width: "0.2em", height: "100%", background: "#68a3a3", position: "absolute", right: 0}}></div>
                {
                    busyTimeSlots.map(timeSlot =>
                        <div style={{
                            width: ((((timeSlot.endHour - timeSlot.startHour) * 60) +
                                timeSlot.endMinute - timeSlot.startMinute)*oneMinuteInPixels).toString() + "px",
                            height: "100%",
                            background: "#68a3a3",
                            borderRadius: "4px",
                            position: "absolute",
                            left: ((timeSlot.startHour - startHour) * oneHourInPixels +
                                   (timeSlot.startMinute - startMinute) * oneMinuteInPixels).toString() + "px"
                        }}></div>
                    )
                }
                {
                    invalidZones.map(zone =>
                        <div key={1} style={{
                            width: ((((zone.endHour - zone.startHour) * 60) +
                                zone.endMinute - zone.startMinute)*oneMinuteInPixels).toString() + "px",
                            height: "100%",
                            background: "red",
                            position: "absolute",
                            left: ((zone.startHour - startHour) * oneHourInPixels +
                                (zone.startMinute - startMinute) * oneMinuteInPixels).toString() + "px"
                        }}></div>
                    )
                }
                {isMouseHover &&
                    <div
                        className={classes.timelineBogey}
                        style={{width: ((durationInPixels - 6.4).toString() + "px"),
                            left: (localCoords.x - durationInPixels / 2)}}>
                        <label style={{left: "-29px"}} className={classes.timelineClock}>
                            {zeroPad(
                                Math.floor(((bogeyCenterHour * 60 + bogeyCenterMinute) - (duration / 2)) / 60),
                                2)}
                            :
                            {zeroPad(
                                Math.floor(((bogeyCenterHour * 60 + bogeyCenterMinute) - (duration / 2)) % 60),
                                2)}
                        </label>
                        <label style={{right: "-29px"}} className={classes.timelineClock}>
                            {zeroPad(
                                Math.floor(((bogeyCenterHour * 60 + bogeyCenterMinute) + (duration / 2)) / 60),
                                2)}
                            :
                            {zeroPad(
                                Math.floor(((bogeyCenterHour * 60 + bogeyCenterMinute) + (duration / 2)) % 60),
                                2)}
                        </label>
                    </div>}
            </div>
        </div>
    );
};

export default LinearTimeline;