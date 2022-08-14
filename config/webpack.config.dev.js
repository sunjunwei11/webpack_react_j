const commConfig = require('./webpack.config.comm');
const { merge } = require('webpack-merge');
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const getStyleRule = l => {
	return [
		'style-loader',
		'css-loader',
		'postcss-loader',
		l
	].filter(Boolean);
};

const devConfig = merge(commConfig, {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		historyApiFallback: true,
		compress: true,
		port: 9000,
		open: true,
		hot: true
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: getStyleRule()
			},
			{
				test: /\.less$/i,
				use: getStyleRule('less-loader'),
			},
			{
				test: /\.s[ac]ss$/i,
				use: getStyleRule('sass-loader'),
			},
			{
				test: /\.jsx?/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true, // 开启缓存
						cacheCompression: false, // 缓存的内容不需要压缩
						plugins: ['react-refresh/babel'], // 开启HMR
					}
				}
			}
		]
	},
	plugins: [
		new ReactRefreshWebpackPlugin()
	],
	// performance: false // 关闭性能分析，提升打包速度
});

console.log(devConfig);

module.exports = devConfig;
