import React, { useEffect, useState } from 'react';
import axiosInstance from '../apicalls/index.js';
import { useSelector } from "react-redux";
import { Row, Col } from 'antd';

function UserLoginData() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.users);

    useEffect(() => {
        const fetchUserData = async() => {
            try {
                const response = await axiosInstance.post('/api/users/get-user-info');
                setUserData(response.data); // Set user data to state
                setLoading(false); // Set loading to false
            } catch (error) {
                console.error(error);
            }
        }

        fetchUserData();
    }, []);

    return ( <
        div >
        <
        h2 > User Login Data < /h2> {
            loading ? ( <
                p > Loading... < /p>
            ) : ( <
                Row gutter = {
                    [16, 16] } >
                <
                Col span = { 8 } > < strong > Username: < /strong></Col >
                <
                Col span = { 16 } > { user.name } < /Col> <
                Col span = { 8 } > < strong > Email: < /strong></Col >
                <
                Col span = { 16 } > { user.email } < /Col> { /* You might not want to display the password for security reasons */ } {
                    /* <Col span={8}><strong>Password:</strong></Col>
                                        <Col span={16}>{user.password}</Col> */
                } <
                /Row>
            )
        } <
        /div>
    );
}

export default UserLoginData;