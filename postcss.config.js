const variables = {
  font: 'Open Sans, sans-serif',

  white: '#ffffff',
  'dark-white': '#FFFEFE',
  black: '#333333',
  'gray-dark': '#5e6366',
  'gray-text': '#6E8490',
  gray: '#F2F2F2',
  'gray-disabled': '#C6CACC',
  'cloudy-gray': '#F7F9FA',
  'blue-disabled': '#c1d3f1',
  blue: '#4285f4',
  'cloudy-blue': '#E1ECFF',
  'dark-blue': '#0A055F',
  'dark-blue-disabled': '#9DB1D1',
  'dark-blue-hover': '#0A055F',
  'blue-bold': '#2E65BF',
  'blue-hover': '#236add',
  'orange-disabled': 'rgba(255, 102, 51, 0.5)',
  orange: '#ff6633',
  'orange-hover': '#f94c13',
  red: '#ff4114',
  'yellow-disabled': '#fff18e',
  yellow: '#ffe41d',
  'yellow-hover': '#ead430',
  'green-disabled': '#bccb6e',
  green: '#33CC66',
};

module.exports = {
  plugins: [
    require('postcss-for'),
    require('postcss-each'),
    require('postcss-preset-env')({ stage: 0 }),
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-mixins'),
    require('postcss-simple-vars')({ variables }),
    require('postcss-automath'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default'
    })
  ]
};
