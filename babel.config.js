module.exports = {
  presets: [
    "module:metro-react-native-babel-preset",
    "module:react-native-dotenv"
  ],
  plugins: [
    'react-native-reanimated/plugin',
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }]
  ],
};