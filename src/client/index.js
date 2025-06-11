import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { StyleProvider } from '@ant-design/cssinjs';
// import { cssinjsCache } from '../styleCache';

hydrateRoot(document.getElementById("root"),
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

// const ssrStyle = document.getElementById('antd-css');
// if (ssrStyle?.parentNode) {
//     ssrStyle.parentNode.removeChild(ssrStyle);
// }

if (module.hot) {
    module.hot.accept();
}