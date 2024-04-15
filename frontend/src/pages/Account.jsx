import React, {useContext, useLayoutEffect, useState} from 'react';
import SwitchBar from "../components/SwitchBar";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import "../styles/Account.css";
import AccountComponent from "../components/AccountComponent";
import AccountSettingsComponent from "../components/AccountSettingsComponent";
import { PersonContext } from '../App';
import MajorFooter from "../components/UI/footers/major_footer/MajorFooter";


const Account = (props) => {
    const [isEdited, setIsEdited] = useState(false);
    const { person, setPerson } = useContext(PersonContext);
    const [pageWidth, setPageWidth] = useState(0);
    useLayoutEffect(() => {
        setPageWidth(window.innerWidth);
        function handleWindowResize() {
            setPageWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"account-page"}>
                {pageWidth > 570 && <SwitchBar></SwitchBar> }
                {
                    !isEdited ?
                        <AccountComponent
                            person={person}
                            gearOnClick={() => {setIsEdited(true);}}
                            style={{margin: "7px 10px 0 20px"}}>
                        </AccountComponent> :
                        <div className={"settings-block"}>
                            <AccountSettingsComponent
                                changePerson={setPerson}
                                returnFunc={() => {setIsEdited(false);}}>
                            </AccountSettingsComponent>
                        </div>
                }
            </div>
            {pageWidth <= 570 && <MajorFooter /> }
        </div>

    );
};

export default Account;