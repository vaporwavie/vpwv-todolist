let combineLoaders = require('webpack-combine-loaders');

module.exports = {
    devtool: 'source-map',
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.js'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader!awesome-typescript-loader'
            },
            {
                test: /\.scss$/,
                loader: combineLoaders([
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[local]'
                        },
                    },
                    {
                        loader: 'sass-loader'
                    }
                ])
            }
        ]
    }
}