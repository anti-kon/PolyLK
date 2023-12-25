import React, {useState} from 'react';
import LaundryComponent from './LaundryComponent';
import RadioInput from "./UI/inputs/radio_input/RadioInput";
const LaundryListComponent = () => {
    const [contact, setContact] = useState('email');

    return (
        <div>
            <div style={{display: "flex"}}>
                <label>Очередь на стирку</label>
                <RadioInput
                    checked={contact === "email"}
                    id="contactChoice1"
                    name="contact"
                    value="email"
                    onChange={value => setContact(value)}>
                    Быстрая стирка (40 минут)
                </RadioInput>
                <RadioInput
                    checked={contact === "phone"}
                    id="contactChoice2"
                    name="contact"
                    value="phone"
                    onChange={value => setContact(value)}>
                    Долгая стирка (60 минут)
                </RadioInput>
            </div>
            <LaundryComponent duration={60}></LaundryComponent>
            <LaundryComponent duration={40}></LaundryComponent>
        </div>
    );
};

export default LaundryListComponent;