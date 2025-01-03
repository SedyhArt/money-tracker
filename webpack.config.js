const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        main: './src/server.ts'
    },
    output: {
        filename: 'bot.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: process.env.IS_PRODUCTION ? "production" : "development",
    target: 'node',
    plugins: [
        new Dotenv(),
    ],
};
