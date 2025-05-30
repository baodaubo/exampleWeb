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