import React, {useContext, useState} from 'react';
import SwitchBar from "../components/SwitchBar";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import "../styles/Account.css";
import AccountComponent from "../components/AccountComponent";
import AccountSettingsComponent from "../components/AccountSettingsComponent";
import { PersonContext } from '../App';


const Account = (props) => {
    const [isEdited, setIsEdited] = useState(false);
    const { person, setPerson } = useContext(PersonContext);

    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"account-page"}>
                <SwitchBar></SwitchBar>
                {
                    !isEdited ?
                        <AccountComponent
                            person={person}
                            gearOnClick={() => {setIsEdited(true);}}
                            style={{margin: "7px 10px 0 20px"}}>
                        </AccountComponent> :
                        <div className={"settings-block"}>
                            <AccountSettingsComponent
                                person={person}
                                changePerson={setPerson}
                                returnFunc={() => {setIsEdited(false);}}>
                            </AccountSettingsComponent>
                        </div>
                }
            </div>
        </div>
    );
};

export default Account;