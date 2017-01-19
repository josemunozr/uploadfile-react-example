module.exports ={
  resolve: {
    extensions: ['', '.js','.jsx']
  },
  context: __dirname,
  entry: {
    app: ['./src/app.jsx']
  },
  output: {
    path: './build',
    filename: 'app.js',
    publicPath: '/build/'
  },
  devServer:{
    host: '0.0.0.0',
    port: 8080,
    inline: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx?)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015','react']
        }
      }
    ]
  }
}
