import React, { useState, useEffect } from 'react'
import { getUserDetails, updateUserDetails } from '../../actions/userActions'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import "./ProfileScreen.scss"

const ProfileScreen = ({ history }) => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)

    const stateDetails = useSelector(state => state.userDetails);
    const { user } = stateDetails;

    const stateLogin = useSelector(state => state.userLogin);
    const { userInfo } = stateLogin;

    const stateUpdate = useSelector(state => state.userUpdateProfile);
    const { loading, userInfo: userUpdatedInfo, error } = stateUpdate;

    const dispatch = useDispatch();

    const key = 'updatable'

    useEffect(() => {
        if (!userInfo)
            history.push("/login");
        else {
            if (!user.name) {
                dispatch(getUserDetails("profile"))
            }
            else if (user) {
                console.log(user.name, user.email)
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [userInfo, user])

    useEffect(() => {
        if (isSubmit) {
            if (loading)
                message.loading("Updating..", key)
            else if (loading === false && userUpdatedInfo)
                message.success({ content: 'Updated Succefully!', key, duration: 2 });
            else if (loading === false && error)
                message.error({ content: error, key, duration: 2 });
        }
    }, [loading])

    const onFinish = () => {
        dispatch(updateUserDetails({ id: user._id, name, email, password }))
        setIsSubmit(true)
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
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
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
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    placeholder="Confrim Password"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Update Profile
            </Button>
            </Form.Item>
        </Form>
    );
}

export default ProfileScreen

