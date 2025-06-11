require('ignore-styles');
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const LoadablePlugin = require("@loadable/webpack-plugin");

module.exports = {
    mode: "production",
    entry: ["./src/server/index.js"],
    target: "node",
    // externals: [nodeExternals()],
    externals: [nodeExternals(),
    ({ request }, callback) => {
        if (request.match(/\.(css|scss|svg)$/)) {
            return callback(null, "commonjs " + request);
        }
        callback();
    },
    ], // Ignore node_modules
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
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "server.js",
        publicPath: "/",
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['isomorphic-style-loader', 'css-loader'],
                // use: [
                //     {
                //         loader: 'css-loader',
                //         // options: {
                //         //     exportOnlyLocals: true,
                //         //     // modules: true,
                //         // },
                //     },
                // ],
            },
            {
                test: /\.less$/,
                use: [
                    'isomorphic-style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            // Ignore CSS & SCSS on the server
            // {
            //     test: /\.(css|scss)$/,
            //     // loader: "null-loader",
            //     options: {
            //         exportOnlyLocals: true, // crucial for SSR
            //     },
            //     // loader: ['style-loader', 'css-loader'],
            // },
            // Ignore Images on the server
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "null-loader",
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    plugins: [new LoadablePlugin({
        filename: "loadable-stats.json",
        writeToDisk: true,
    })],
};
