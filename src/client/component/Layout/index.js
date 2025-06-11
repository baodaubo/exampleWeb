// require('ignore-styles');
// if (typeof require !== 'undefined') {
//     require('ignore-styles');
// }
import React, {
    useEffect, useState,
    Suspense
} from "react";
import { Layout, Menu } from "antd";
import {
    MenuFoldOutlined, MenuUnfoldOutlined,
    HomeOutlined, SettingOutlined
} from "@ant-design/icons";
import { useRoutes, Link, useLocation } from "react-router-dom";
// import loadable from '@loadable/component';
// import './index.css';
// import styles from './index.module.css';
import MainPage from "../Main";
// import MainPage from "@client/component/Main";
import Setting from "../Setting";
// import { createCache, extractStyle } from '@ant-design/cssinjs';
// const MainPage = loadable(() => import('../Main'));
// const SettingPage = loadable(() => import('../Setting'));

const Loading = () => {
    return <h2>🌀 Loading...</h2>;
}

const LayoutComponent = () => {
    const { Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState('/');
    // const [loading, setLoading] = useState(true);
    const location = useLocation();

    const routeList = [
        { path: "/", element: <MainPage />, icon: <HomeOutlined />, label: 'Home' },
        { path: "/setting", element: <Setting />, icon: <SettingOutlined />, label: 'Settings' },
    ];

    const AppRoutes = () => {
        return useRoutes(routeList);
    };

    const [routeListClone, setRouteListClone] = useState([]);

    // if (typeof window !== "undefined") {
    //     require("./index.css");
    // }
    // else {
    //     if (loading)
    //         setLoading(false);
    // }`

    useEffect(() => {
        // if (document.readyState === "complete") {
        //     console.log('zzz')
        //     setSelectedKeys(location.pathname);
        // }
        const handleLoad = () => {
            // setLoading(false);
            console.log('zzz')
            setRouteListClone([...routeList]);
            setSelectedKeys(location.pathname);
            // setCollapsed(false);
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
            <Suspense fallback={<Loading />}>
                <Layout
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
                            // className={styles.logo}
                            className='logo'
                            style={{ padding: 16, color: "white", textAlign: "center" }}>
                            {collapsed ? "🔹" : "My App"}
                        </div>
                        <Menu theme="dark"
                            defaultSelectedKeys={["/"]}
                            selectedKeys={[selectedKeys]}
                            mode="inline">
                            {
                                routeListClone?.map((item) => {
                                    return (
                                        <Menu.Item
                                            key={item.path}
                                            icon={item.icon}
                                            onClick={() => {
                                                setSelectedKeys(item.path);
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
                                    onClick={() => {
                                        setCollapsed(!collapsed);
                                    }}
                                    style={{ marginBottom: 16 }}>
                                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                </button>
                                {/* <p>Main Content Area</p> */}
                                <AppRoutes />
                            </Content>
                        </Layout>
                    }
                </Layout>
            </Suspense>
            {/* {
                loading
                    ? <Loading />
                    : (
                        <Layout
                            style={{
                                minHeight: "100vh",
                                display: 'flex',
                                flexFlow: 'row wrap',
                                fontFamily: 'Arial, Helvetica, sans-serif'
                            }}>
                            <Sider
                                style={{ background: '#000' }}
                                collapsible
                                collapsed={collapsed}
                                onCollapse={() => setCollapsed(!collapsed)}>
                                <div
                                    // className={styles.logo}
                                    className='logo'
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

                            {
                                <Layout>
                                    <Content style={{ padding: "24px" }}>
                                        <p>zzz</p>
                                        <button
                                            onClick={() => setCollapsed(!collapsed)}
                                            style={{ marginBottom: 16 }}>
                                            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                        </button>
                                        <AppRoutes />
                                    </Content>
                                </Layout>
                            }
                        </Layout>
                    )
            } */}
        </>
    )
}

export default LayoutComponent;