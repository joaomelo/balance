module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:cypress/recommended',
    'plugin:chai-friendly/recommended'
  ],
  rules: {
    semi: ['error', 'always'],
    'no-console': [
      'warn', {
        allow: ['warn', 'error', 'info']
      }
    ],
    'no-debugger': 'warn',
    'import/export': 0, // erroneous report "no named exports" when exporting from jsx
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true
  }
};
