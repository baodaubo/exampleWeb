require('module-alias/register');

import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import ServerApp from "../client/serverEntry";
import fs from "fs";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import clientConfig from "../../webpack.client.js";
// import { ChunkExtractor } from "@loadable/server";

const app = express();
// Webpack HMR Setup
if (process.env.NODE_ENV !== "production") {
    const compiler = webpack(clientConfig);
    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: clientConfig.output.publicPath,
        })
    );
    app.use(webpackHotMiddleware(compiler));
}

// Serve static files
app.use(express.static("dist"));

// Server-side rendering
app.get("*", (req, res) => {
    // const context = {};
    // const statsFile = path.resolve("dist/loadable-stats.json");
    // const extractor = new ChunkExtractor({ statsFile });
    // const jsx = extractor.collectChunks(
    //     <ServerApp url={req.url} />
    // );
    const appHtml = renderToString(
        <ServerApp url={req.url} />
    );

    // Read the HTML template
    const template = fs.readFileSync(path.resolve("views/template.html"), "utf8");

    // Inject the rendered app into the template
    const html = template.replace("<!-- APP -->", appHtml);

    res.send(html);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));