import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const items = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    key: "allusers",
    label: "Employees",
    icon: <UserOutlined />,
    children: [
      {
        key: "employees",
        label: "All",
      },
      {
        key: "employees/create",
        label: "Create",
      },
    ],
  },
  {
    key: "signout",
    label: "Sign Out",
    icon: <LogoutOutlined />,
    danger: true,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { signout } = useAuthContext();

  return (
    <div className="md:w-[300px]">
      <Button
        type="default"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        onClick={(item) => {
          if (item.key === "signout") {
            signout();
            navigate("/");
          } else {
            navigate(item.key);
          }
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["users"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};

export default Sidebar;
