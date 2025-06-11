// require('ignore-styles');
// require('@babel/register')({
//     presets: ['@babel/preset-env', '@babel/preset-react'],
// });
import React from "react";
import { StaticRouter } from "react-router"; // ✅ Use react-router/server
import App from "./App";

export default function ServerApp({ url }) {
    return (
        <StaticRouter location={url}>
            <App />
        </StaticRouter>
    );
}