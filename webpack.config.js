const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: { rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        },
    ]}, 
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html' //dove trova template da inserire poi in dist
         }),
    ],
    devServer: {
        open: true, //quando lanciamo server si apre automaticamente browser
        static: path.resolve(__dirname, 'dist') //quale applicazione il webservere deve mostrare nel brwser
    }, 

};