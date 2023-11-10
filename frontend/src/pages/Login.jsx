import React from 'react';
import LoginComponent from "../components/LoginComponent";
import "../styles/Login.css"


const Login = () => {
    return (
        <div className={"login-page"}>
            <LoginComponent></LoginComponent>
        </div>
    );
};

export default Login;