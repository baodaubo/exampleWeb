import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
    MenuFoldOutlined, MenuUnfoldOutlined,
    HomeOutlined, SettingOutlined
} from "@ant-design/icons";
import { useRoutes, Link, useLocation } from "react-router-dom";
import loadable from '@loadable/component';
// import './index.css';
import MainPage from "../Main";
// import MainPage from "@client/component/Main";
// import Setting from "../Setting";

// const MainPage = loadable(() => import('../Main'));
const SettingPage = loadable(() => import('../Setting'));
const routeList = [
    { path: "/", element: <MainPage />, icon: <HomeOutlined />, label: 'Home' },
    { path: "/setting", element: <SettingPage />, icon: <SettingOutlined />, label: 'Settings' },
]

const AppRoutes = () => {
    return useRoutes(routeList);
};

const Loading = () => {
    return <h2>🌀 Loading...</h2>;
}

const LayoutComponent = () => {
    const { Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState('/');
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    if (typeof window !== "undefined") {
        require("./index.css");
    }
    else {
        if (loading)
            setLoading(false);
    }

    useEffect(() => {
        const handleLoad = () => {
            setLoading(false);
            setSelectedKeys(location.pathname);
        }

        setTimeout(() => {
            if (document.readyState === "complete") {
                handleLoad();
            } else {
                window.addEventListener("load", handleLoad);
            }
            return () => window.removeEventListener("load", handleLoad);
        }, 500);

        // const handleHydration = () => {
        //     setLoading(false);
        //     setSelectedKeys(location.pathname);
        // }

        // if (typeof window !== "undefined") {
        //     requestAnimationFrame(() => {
        //         setTimeout(() => handleHydration(), 100);
        //     });
        // }
    }, []);

    return (
        <>
            {
                loading
                    ? <Loading />
                    : (<Layout
                        style={{
                            minHeight: "100vh",
                            display: 'flex',
                            flexFlow: 'row wrap',
                            fontFamily: 'Arial, Helvetica, sans-serif'
                        }}>
                        {/* Sidebar */}
                        <Sider
                            style={{ background: '#000' }}
                            collapsible
                            collapsed={collapsed}
                            onCollapse={() => setCollapsed(!collapsed)}>
                            <div
                                className="logo"
                                style={{ padding: 16, color: "white", textAlign: "center" }}>
                                {collapsed ? "🔹" : "My App"}
                            </div>
                            <Menu theme="dark"
                                defaultSelectedKeys={["/"]}
                                selectedKeys={[selectedKeys]}
                                mode="inline">
                                {
                                    routeList?.map((item) => {
                                        return (
                                            <Menu.Item
                                                key={item.path}
                                                icon={item.icon}
                                                onClick={() => {
                                                    setSelectedKeys(item.path)
                                                }}>
                                                <Link to={item.path}>{item.label}</Link>
                                            </Menu.Item>
                                        )
                                    })
                                }
                            </Menu>
                        </Sider>

                        {/* Main Content */}
                        {
                            <Layout>
                                <Content style={{ padding: "24px" }}>
                                    <p>zzz</p>
                                    <button
                                        onClick={() => setCollapsed(!collapsed)}
                                        style={{ marginBottom: 16 }}>
                                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                    </button>
                                    {/* <p>Main Content Area</p> */}
                                    <AppRoutes />
                                </Content>
                            </Layout>
                        }
                    </Layout>)
            }
        </>
    )
}

export default LayoutComponent;