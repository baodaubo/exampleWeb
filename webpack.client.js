const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    resolve: {
        alias: {
            "@client": path.resolve(__dirname, "src/client/"),
            "@server": path.resolve(__dirname, "src/server/"),
            "@component": path.resolve(__dirname, "src/client/component/"), // ✅ Fixed
            "@customHook": path.resolve(__dirname, "src/client/customHook/"), // ✅ Fixed
            // "@": path.resolve(__dirname, "src/"),
            // "@server": path.resolve(__dirname, "src/server/"),
            // "@component": path.resolve(__dirname, "src/client/component/"), // ✅ Example alias
            // "@customHook": path.resolve(__dirname, "src/client/customHook/"), // ✅ Example alias
        },
        extensions: [".js", ".jsx", ".json"],
    },
    entry: [
        "webpack-hot-middleware/client?reload=true",
        "./src/client/index.js"
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/",
    },
    module: {
        rules: [
            // CSS & SCSS Loader
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            // Image Loaders (JPG, PNG, GIF, SVG)
            {
                test: /\.(png|jpg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: "inline-source-map",
    // webpack
};
