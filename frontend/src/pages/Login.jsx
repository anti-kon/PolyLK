import React from 'react';
import LoginComponent from "../components/LoginComponent";
import "../styles/Login.css"


const Login = (props) => {
    return (
        <div className={"login-page"}>
            <LoginComponent loginFunc={props.loginFunc}></LoginComponent>
        </div>
    );
};

export default Login;
