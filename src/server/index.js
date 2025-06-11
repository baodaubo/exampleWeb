require('ignore-styles');
// require('@babel/register')({
//     presets: ['@babel/preset-env', '@babel/preset-react'],
// });
// if (typeof require !== 'undefined') {
//     require('ignore-styles');
// }
require('module-alias/register');

import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import fs from "fs";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import clientConfig from "../../webpack.client.js";
import ServerApp from "../client/serverEntry";
// import StyleContext from 'isomorphic-style-loader/StyleContext';

// import { getCssinjsStyle } from '../styleCache';
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

    const css = fs.readFileSync(path.resolve('src/client/component/Layout/index.css'), 'utf8');

    // const antdStyles = getCssinjsStyle();
    // const antdStylesString = renderToString(
    //     <style id="antd-css">{antdStyles}</style>
    // );
    // Read the HTML template
    const template = fs.readFileSync(path.resolve("views/template.html"), "utf8");

    // Inject the rendered app into the template
    const html = template
        .replace("<!-- STYLE -->", `<style id="antd-css">${css}</style>`)
        .replace("<!-- APP -->", appHtml);

    res.send(html);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));