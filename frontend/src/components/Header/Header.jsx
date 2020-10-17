import React, { Fragment, useState } from "react";
import "./Header.scss"
import { Menu, Layout, Image, Button, Input } from 'antd';
import { ShoppingCartOutlined, LoginOutlined, SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';

const Header = () => {

    const { Header } = Layout;

    const [searchField, setSearchField] = useState(false)

    return (
        <Fragment>
            <Header className="header" theme="light">
                <div className="logo">
                    <Image
                        src="logo.png"
                    />
                    <a href="/home">PROSHOP</a>
                </div>
                <Menu className="navbar-items" theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item className="navbar-item" key="mail" icon={<ShoppingCartOutlined />} href="/cart">
                        Cart
                </Menu.Item>
                    <Menu.Item className="navbar-item" key="app" icon={<LoginOutlined />} href="/login">
                        Sign In
                </Menu.Item>
                    <Menu.Item className="navbar-item" icon={<SearchOutlined />} onClick={() => {
                        setSearchField(!searchField);
                    }
                    }>
                    </Menu.Item>
                </Menu>
            </Header>

            <div className={`search-field ${searchField ? "appear" : "disappear"}`}>
                <Input placeholder="Search..." /><CloseCircleOutlined onClick={() => {
                    setSearchField(false);
                }} />
            </div>
        </Fragment>
    );
};

export default Header;
