const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');


module.exports = {
	mode: 'development',
	entry: './src/index.jsx',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/[name][chunkhash:6].js',
		chunkFilename: 'js/[name][chunkhash:6].chunk.js',
		assetModuleFilename: 'media/[name][chunkhash:6][ext][query]',
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 4 * 1024 // 4kb
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../template.html'),
			filename: 'index.html'
		}),
		new ESLintPlugin({
			context: path.resolve(__dirname, '../src'),
			exclude: 'node_modules',
			cache: true,
			cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache')
		}),
		new CopyPlugin({
			patterns: [
				{ from: path.resolve(__dirname, '../public'), to: path.resolve(__dirname, '../dist') }
			],
		}),
	],
	optimization: {
		splitChunks: {
			// include all types of chunks
			chunks: 'all',
			cacheGroups: {
				react: {
					test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
					name: 'chunk-react',
					priority: 30,
				},
				antd: {
					test: /[\\/]node_modules[\\/]antd(.*)?[\\/]/,
					name: 'chunk-antd',
					priority: 20,
				},
				libs: {
					test: /[\\/]node_modules[\\/]/,
					name: 'chunk-libs',
					priority: 10
				},
			},
			// minSize: 0
		},
		runtimeChunk: {
			name: (entrypoint) => `runtime~${entrypoint.name}`, // 改动utils代码不会影响到打包后的index.js文件
		},
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
};
