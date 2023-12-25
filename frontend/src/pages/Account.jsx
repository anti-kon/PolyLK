import React, {useState} from 'react';
import SwitchBar from "../components/SwitchBar";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import "../styles/Account.css";
import AccountComponent from "../components/AccountComponent";
import AccountSettingsComponent from "../components/AccountSettingsComponent";


const Account = (props) => {
    const [isEdited, setIsEdited] = useState(false);

    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"account-page"}>
                <SwitchBar></SwitchBar>
                {
                    !isEdited ?
                        <AccountComponent
                            person={props.person}
                            gearOnClick={() => {setIsEdited(true);}}
                            style={{margin: "7px 10px 0 20px"}}>
                        </AccountComponent> :
                        <div className={"settings-block"}>
                            <AccountSettingsComponent
                                person={props.person}
                                changePerson={props.changePerson}
                                returnFunc={() => {setIsEdited(false);}}>
                            </AccountSettingsComponent>
                        </div>
                }
            </div>
        </div>
    );
};

export default Account;