module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  ignorePatterns: ['src/assets/**/*', 'public/**/*'],
  rules: {
    semi: ['error', 'never'],
    'react/jsx-filename-extension': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/forbid-prop-types': 'off',
    'max-len': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'import/prefer-default-export': 'off',
    'no-promise-executor-return': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'jsx-a11y/media-has-caption': 'off',
    camelcase: 'off',
    'no-prototype-builtins': 'off',
    'react/no-this-in-sfc': 'off',
    'prefer-destructuring': 'off',
    'react/no-array-index-key': 'off',
    'arrow-body-style': 'off',
    'no-use-before-define': 'off',
    'consistent-return': 'off',
  },
}
