const commConfig = require('./webpack.config.comm');
const { merge } = require('webpack-merge');
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { primaryColor, linkColor, borderRadiusBase } = require('./commonConst');

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
		// open: true,
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
				use: getStyleRule({
					loader: 'less-loader', // compiles Less to CSS
					options: {
						lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
							modifyVars: {
								'primary-color': primaryColor,
								'link-color': linkColor,
								'border-radius-base': borderRadiusBase,
							},
							javascriptEnabled: true,
						},
					},
				}),
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
	performance: false // 关闭性能分析，提升打包速度
});

console.log(devConfig);

module.exports = devConfig;
