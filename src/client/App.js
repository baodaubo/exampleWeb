// import './App.css';
// import Logo from "./logo.svg";
// import { Route, Routes, BrowserRouter } from "react-router-dom";
import React from "react";
import LayoutComponent from './component/Layout';

const App = () => {
    let Logo;
    if (typeof window !== "undefined") {
        Logo = require("./logo.svg").default;
        require("./App.css");
    }

    return <LayoutComponent />
};

export default App;