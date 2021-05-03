import React, { useState } from "react";
import "./Header.scss";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { userLogout } from "../../actions/userActions"
import { Menu, Layout, Input } from "antd";
import {
  ShoppingCartOutlined,
  LoginOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined
} from "@ant-design/icons";


const Header = () => {

  const { Header } = Layout;
  const { SubMenu } = Menu;

  let history = useHistory()

  const [searchField, setSearchField] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);

  const state = useSelector(state => state.userLogin)
  const { userInfo } = state

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(userLogout())
    history.push("/")
  }


  return (
    <div>
      <Header className="header" theme="light">
        <Link to="/">
          <div
            className="logo"
            onClick={() => {
              setSelectedKey(null);
            }}
          >
            <img src="/logo.png" />
            <span>PROSHOP</span>
          </div>
        </Link>
        <Menu
          className="navbar-items"
          theme="light"
          mode="horizontal"
          onClick={(e) => {
            setSelectedKey(e.key);
          }}
          selectedKeys={[selectedKey]}
        >
          <Menu.Item
            className="navbar-item"
            key="cart"
            icon={<ShoppingCartOutlined />}
          >
            <Link to="/cart">Cart</Link>
          </Menu.Item>

          {
            userInfo ?
              <SubMenu
                key="SubMenu"
                icon={<UserOutlined />}
                title={userInfo.name}
              >
                <Menu.Item key="setting:1" icon={<ProfileOutlined />}><Link to="/profile">Profile</Link></Menu.Item>
                <Menu.Item key="setting:2" icon={<LogoutOutlined />} onClick={() => logoutHandler()}>Logout</Menu.Item>
              </SubMenu>
              : <Menu.Item
                className="navbar-item"
                key="login"
                icon={<LoginOutlined />}
              >
                <Link to="/login">Sign In</Link>
              </Menu.Item>
          }

          <Menu.Item
            className="navbar-item"
            icon={<SearchOutlined />}
            onClick={() => {
              setSearchField(!searchField);
            }}
          ></Menu.Item>
        </Menu>
      </Header>

      <div className={`search-field ${searchField ? "appear" : "disappear"}`}>
        <Input placeholder="Search..." />
        <CloseCircleOutlined
          onClick={() => {
            setSearchField(false);
            setSelectedKey(null);
          }}
        />
      </div>
    </div>
  );
};

export default Header;
