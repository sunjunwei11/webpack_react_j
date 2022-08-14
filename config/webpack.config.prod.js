const commConfig = require('./webpack.config.comm');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const { primaryColor, linkColor, borderRadiusBase } = require('./commonConst');

const getStyleRule = l => {
	return [
		MiniCssExtractPlugin.loader,
		'css-loader',
		'postcss-loader',
		l
	].filter(Boolean);
};

const prodConfig = merge(commConfig, {
	mode: 'production',
	devtool: 'source-map',
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
					loader: 'babel-loader'
				}
			}
		]
	},
	plugins: [new MiniCssExtractPlugin({
		filename: 'static/css/[name][contenthash:6].css',
		chunkFilename: 'static/css/[name][contenthash:6].chunk.css'
	})],
	optimization: {
		minimizer: [
			// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
			// `...`,
			new CssMinimizerPlugin(),
		],
	},
});

console.log(prodConfig);

module.exports = prodConfig;
