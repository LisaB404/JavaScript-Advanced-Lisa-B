const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const loader = require('sass-loader');

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
   /*   {
            test: /\.js$/i,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']  
                }
            }
        },
        {
            test: /\.(jpe?g|png|webp)$/i,
            type: 'asset/resource'
        }*/
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