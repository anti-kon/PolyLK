import React from 'react';
import SwitchBar from "../components/SwitchBar";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import "../styles/Account.css";

<<<<<<< Updated upstream
const Account = () => {
=======
const Account = (props) => {
    const [isEdited, setIsEdited] = useState(false);

>>>>>>> Stashed changes
    return (
        <div>
<<<<<<< Updated upstream
            <MajorHeader></MajorHeader>
            <div className={"account-page"}>
                <SwitchBar></SwitchBar>
            </div>
=======
<<<<<<< Updated upstream
            <SwitchBar></SwitchBar>
=======
            <MajorHeader></MajorHeader>
            <div className={"account-page"}>
                <SwitchBar></SwitchBar>
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
            </div>
>>>>>>> Stashed changes
>>>>>>> Stashed changes
        </div>
    );
};

export default Account;