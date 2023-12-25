import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';

const LinearTimeline = ({startHour = 0, startMinute = 0,
                            endHour = 24,endMinute = 0,
                            duration, ...props}) => {
    const [isMouseHover, setIsMouseHover] = useState(false);
    const [localCoords, setLocalCoords] = useState({x: 0, y: 0});

    const [durationInPixels, setDurationInPixels] = useState(0);

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
    };

    useEffect(() => {
        setDurationInPixels(ref.current.clientWidth * (duration / (endTime - startTime)));

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
        <div style={{width: "100%", height: "40px"}}>
            <div style={{width: "100%", position: 'relative', height: "100%", display: "flex", alignItems: "center"}}
                 onMouseMove={handleMouseMove}
                 ref={ref}>
                <div style={{width: "100%", height: "5px", background: "red"}}></div>
                <div style={{width: "5px", height: "100%", background: "red", position: "absolute", left: 0}}></div>
                <div style={{width: "5px", height: "100%", background: "red", position: "absolute", right: 0}}></div>
                {isMouseHover &&
                    <div
                        style={{width: (durationInPixels.toString() + "px"), height: "100%", left: (localCoords.x - durationInPixels / 2), position: "absolute", background: "yellow"}}></div>}
            </div>
        </div>
    );
};

export default LinearTimeline;