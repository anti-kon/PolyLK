import React from 'react';
import TextInput from "./UI/inputs/text_input/TextInput";
import PasswordInput from "./UI/inputs/password_input/PasswordInput";
import MajorButton from "./UI/buttons/major_button/MajorButton";
import ShadowButton from "./UI/buttons/shadow_button/ShadowButton";

const AccountSettingsComponent = ({returnFunc, person, ...props}) => {
    return (
        <div className={"account-setting"}>
            <TextInput
                style={{
                    height: "48px",
                    fontSize: "20px",
                    color: "#68a3a3"
                }}
                valid={true}
                value={person.login}>
            </TextInput>
            <PasswordInput
                placeholder={"Введите новый пароль"}
                style={{
                    height: "48px",
                    margin: "20px 0",
                    fontSize: "20px"
                }}
                valid={true}>
            </PasswordInput>
            <PasswordInput
                placeholder={"Подтвердите пароль"}
                style={{
                    height: "48px",
                    margin: "20px 0",
                    fontSize: "20px"
                }}
                valid={true}>
            </PasswordInput>
            <div className={"button-panel"}>
                <MajorButton
                    style={{
                        width: "170px",
                        height: "48px",
                        borderRadius: "7px",
                        fontSize: "20px",
                        margin: "0 auto 0 0",
                    }}>
                    Сохранить
                </MajorButton>
                <ShadowButton
                    onClick={returnFunc}
                    style={{
                        width: "170px",
                        height: "48px",
                        borderRadius: "7px",
                        fontSize: "20px",
                        margin: "0 0 0 auto",
                        justifyContent: "center"
                    }}>
                    Отмена
                </ShadowButton>
            </div>
        </div>
    );
};

export default AccountSettingsComponent;