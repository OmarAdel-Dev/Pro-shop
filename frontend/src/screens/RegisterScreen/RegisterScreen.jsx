import React, { useState, useEffect } from 'react'
import { userRegister } from '../../actions/userActions'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import "../LoginScreen/LoginScreen.scss"
import { Link } from 'react-router-dom';

const RegisterScreen = ({ location, history }) => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")

    const redirect = location.search ? location.search.split("=")[1] : "/"

    const state = useSelector(state => state.userRegister);
    const { userInfo, loading, error } = state;

    const dispatch = useDispatch();

    const key = 'updatable'

    useEffect(() => {
        console.log(userInfo)
        if (userInfo)
            history.push(redirect);

    }, [history, userInfo])

    useEffect(() => {

        console.log(loading)
        if (loading)
            message.loading("Registering...", key)
        else if (loading === false && userInfo)
            message.success({ content: 'Welcome to ProShop!', key, duration: 2 });
        else if (loading === false && error)
            message.error({ content: error, key, duration: 2 });

    }, [loading])

    const onFinish = () => {
        if (password !== confirmPassword) {

        } else {
            dispatch(userRegister(name, email, password))
        }
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
        >
            <Form.Item
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your name!',
                    },
                ]}

            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />}
                    value={name}
                    onChange={(e) => setName(e.target.value)} placeholder="Name" />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your Email!',
                    },
                ]}

            >
                <Input prefix={<MailOutlined className="site-form-item-icon" />}
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
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                    {
                        required: true,
                        message: "Please confirm your Password!",
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    placeholder="Confrim Password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Register
            </Button>
                <span>Already have an acount! </span>
                <Link to="/login">
                    login
            </Link>
            </Form.Item>
        </Form>
    );
}

export default RegisterScreen

