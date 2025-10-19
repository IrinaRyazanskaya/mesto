const presets = [
  [
    "@babel/preset-env",
    {
      corejs: 3,
      useBuiltIns: "entry",
      targets: ">0.2%, not dead, not op_mini all, not ie <= 11",
    },
  ],
];

module.exports = { presets };
