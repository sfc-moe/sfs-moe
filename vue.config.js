module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    background: {
      entry: 'src/background/index.ts',
      template: 'public/background.html',
      filename: 'background.html',
      chunks: ['chunk-vendors', 'chunk-common', 'background']
    }
  }
}
