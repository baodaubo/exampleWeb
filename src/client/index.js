import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

hydrateRoot(document.getElementById("root"),
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

if (module.hot) {
    module.hot.accept();
}