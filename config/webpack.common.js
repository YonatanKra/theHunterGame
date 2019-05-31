const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/app.js'], // this is our app
    output: {
        chunkFilename: '[name].bundle.js',
        filename: '[name].bundle.js', // the file name would be my entry's name with a ".bundle.js" suffix
        path: path.resolve(process.cwd(), 'dist') // put all of the build in a dist folder
    },
    plugins: [
        // This plugin creates our index.html that would load the app for us in the browser
        new HtmlWebpackPlugin({
            title: 'Bops vs. Kitties'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                  'file-loader',
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      mozjpeg: {
                        progressive: true,
                        quality: 65
                      },
                      // optipng.enabled: false will disable optipng
                      optipng: {
                        enabled: false,
                      },
                      pngquant: {
                        quality: '65-90',
                        speed: 4
                      },
                      gifsicle: {
                        interlaced: false,
                      },
                      // the webp option will enable WEBP
                      webp: {
                        quality: 75
                      }
                    }
                  },
                ]
            },
            // use the url loader for font files
            {
                test: /\.(woff2?|ttf|eot|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            },
            // use the html loader
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [{loader: 'html-loader'}]
            },
            // use the css loaders (first load the css, then inject the style)
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};