const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: path.join(__dirname, "src", "index.js"),
	output: {
		path: path.join(__dirname, "dist"),
		filename: "app.bundle.js",
		publicPath: "/",
		clean: true,
	},
	mode: process.env.NODE_ENV || "development",
	devtool: "source-map",
	resolve: {
		extensions: [".jsx", ".js"],
		modules: ["node_modules", "src"],
	},
	devServer: {
		hot: true,
		historyApiFallback: true,
		port: process.env.PORT ?? 8000,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "public", "index.html"),
		}),
	],
	module: {
		rules: [
			{
				test: /\.svg$/,
				use: ["@svgr/webpack"],
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(js)x?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
		],
	},
};
