import React, { useState } from "react";
import "./Header.scss";
import { c, Link } from "react-router-dom";
import { Menu, Layout, Image, Input } from "antd";
import {
  ShoppingCartOutlined,
  LoginOutlined,
  SearchOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const Header = () => {
  const { Header } = Layout;

  const [searchField, setSearchField] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);

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

          <Menu.Item
            className="navbar-item"
            key="login"
            icon={<LoginOutlined />}
          >
            <Link to="/login">Sign In</Link>
          </Menu.Item>
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
