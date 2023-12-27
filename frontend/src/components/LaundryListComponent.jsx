import React, {useEffect, useState} from 'react';
import LaundryComponent from './LaundryComponent';
import RadioInput from "./UI/inputs/radio_input/RadioInput";
import "../styles/LaundryAppointment.css"
import ContentBox from "./UI/content_boxes/content_box/ContentBox";
import TipBoxComponent from "./TipBoxComponent";

const LaundryListComponent = () => {
    const [duration, setDuration] = useState(40);

    const washingMachine = [
        {id: 0, num: 1},
        {id: 1, num: 2},
        {id: 2, num: 3}
    ];

    const dryingMachine = [
        {id: 3, num: 4},
        {id: 2, num: 5}
    ];

    return (
        <div className={"laundry-list"}>
            <div style={{display: "flex"}}>
                <label className={"laundry-list-label"}>Очередь на стирку</label>
                <RadioInput
                    checked={duration === 40}
                    id="durationChoice1"
                    name="duration"
                    value={40}
                    onChange={value => setDuration(value)}>
                    Быстрая стирка (40 минут)
                </RadioInput>
                <RadioInput
                    checked={duration === 60}
                    id="durationChoice2"
                    name="duration"
                    value={60}
                    onChange={value => setDuration(value)}>
                    Долгая стирка (60 минут)
                </RadioInput>
            </div>
            <div>
                {washingMachine.map((washer) =>
                    <LaundryComponent
                        key={washer.id}
                        duration={duration}
                        num={washer.num}
                        isDryer={false}>
                    </LaundryComponent>
                )}
            </div>
            <div style={{marginTop: "60px"}}>
                {dryingMachine.map((dryer) =>
                    <LaundryComponent
                        key={dryer.id}
                        duration={duration}
                        num={dryer.num}
                        isDryer={true}>
                    </LaundryComponent>
                )}
            </div>
        </div>
    );
};

export default LaundryListComponent;