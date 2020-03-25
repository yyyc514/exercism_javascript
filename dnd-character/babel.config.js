module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: 'current',
        },
        // corejs: "3",
        useBuiltIns: false,
        // "useBuiltIns": "usage",
        shippedProposals: true
      },

    ],
  ],
};
