module.exports = function (api) {
  console.info(`Babel config function executed with envName: ${api.env()}`);

  return {
    plugins: ['babel-plugin-styled-components'],
    presets: [
      '@babel/env',
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
          development: api.env() === 'development'
        }
      ]
    ]
  };
};
