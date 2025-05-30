module.exports = {
    presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        // "babel-preset-react-app"
    ],
    plugins: [
        "@babel/plugin-transform-runtime",
        "@loadable/babel-plugin",
        "@babel/plugin-transform-modules-commonjs",
        // [
        //     'module-resolver',
        //     {
        //         root: ['./src'],
        //         alias: {
        //             "@client": "./src/client",
        //             "@server": "./src/server",
        //             "@component": "./src/client/component",
        //             "@customHook": "./src/client/customHook",
        //         },
        //     },
        // ],
    ]
};  