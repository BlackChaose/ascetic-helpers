module.exports = {
  presets: [
    ['@babel/preset-env',
      {
        targets: {
          node: 'current',
          chrome: '58',
          ie: '10',
        },
      },
    ],
  ],
  env: {
    development: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    },
    production: {
      presets: [
        ['@babel/preset-env',
          {
            targets: {
              node: 'current',
              chrome: '58',
              ie: '10',
            },
          },
        ],
      ],
    },
  },
};
