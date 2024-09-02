import React from "react";
import { Form, message } from "antd";
import { Link } from "react-router-dom";
import { loginUser } from "../../../apicalls/users.js";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice.js";

function Login() {
    const dispatch = useDispatch();

    const onFinish = async(values) => {
        try {
            dispatch(ShowLoading());
            const response = await loginUser(values);
            dispatch(HideLoading());

            if (response.success) {
                message.success(response.message);
                localStorage.setItem("token", response.data);
                window.location.href = '/hello';
            } else {
                message.error(response.message || "Login failed");
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error("An error occurred during login");
        }
    };

    return ( <
        div className = "flex justify-center items-center h-screen w-screen bg-primary" >
        <
        div className = "card w-400 p-3 bg-white" >
        <
        div className = "flex flex-col" >
        <
        div className = "flex" >
        <
        h1 className = "text-2xl" > QUIZUP - LOGIN < /h1> <
        /div> <
        div className = "divider" > < /div> <
        Form layout = "vertical"
        className = "mt-2"
        onFinish = { onFinish } >
        <
        Form.Item name = "email"
        label = "Email"
        rules = {
            [{ required: true, message: 'Please input your email!' }] } >
        <
        input type = "text" / >
        <
        /Form.Item> <
        Form.Item name = "password"
        label = "Password"
        rules = {
            [{ required: true, message: 'Please input your password!' }] } >
        <
        input type = "password" / >
        <
        /Form.Item> <
        div className = "flex flex-col gap-2" >
        <
        button type = "submit"
        className = "primary-contained-btn mt-2 w-100" > Login < /button> <
        Link to = "/register"
        className = "underline" > Not a member ? Register < /Link> <
        /div> <
        /Form> <
        /div> <
        /div> <
        /div>
    );
}

export default Login;