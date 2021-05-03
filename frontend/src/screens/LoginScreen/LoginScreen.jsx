import React, { useState, useEffect } from 'react'
import { userLogin } from '../../actions/userActions'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import "./LoginScreen.scss"
import { Link } from 'react-router-dom';
const LoginScreen = ({ location, history }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const redirect = location.search ? location.search.split("=")[1] : "/"

    const state = useSelector(state => state.userLogin);
    const { userInfo, loading, error } = state;

    const dispatch = useDispatch();

    const key = 'updatable'

    useEffect(() => {
        if (userInfo)
            history.push(redirect);

    }, [history, userInfo])

    useEffect(() => {

        console.log(loading)
        if (loading)
            message.loading("Logging in...", key)
        else if (loading === false && userInfo)
            message.success({ content: 'Welcome to ProShop!', key, duration: 2 });
        else if (loading === false && error)
            message.error({ content: error, key, duration: 2 });

    }, [loading])

    const onFinish = () => {
        dispatch(userLogin(email, password))
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                    },
                ]}

            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>
            <Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
            </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                    Log in
            </Button>
                <span>Or </span>
                <Link to="/register">
                    register now!
                </Link>
            </Form.Item>
        </Form>
    );
}

export default LoginScreen

