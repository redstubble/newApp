module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
      "airbnb",
      'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
      'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
      'plugin:import/errors', // Checks file paths for imports
      'plugin:import/warnings', // Checks file paths for imports
      'plugin:compat/recommended', // Lint the browser compatibility of your code
      'plugin:promise/recommended', // Enforce best practices for JavaScript promises.
      'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
      'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    parserOptions: {
      ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
      allowImportExportEverywhere: true,
      ecmaFeatures: {
        jsx: true, // Allows for the parsing of JSX
      },
    },
    rules: {
      "arrow-parens": ["off"],
      "compat/compat": "error",
      "consistent-return": "off",
      "comma-dangle": "off",
      "generator-star-spacing": "off",
      "import/no-unresolved": "error",
      "import/no-extraneous-dependencies": "off",
      "jsx-a11y/anchor-is-valid": "off",
      "no-console": "off",
      "no-use-before-define": "off",
      "no-multi-assign": "off",
      "promise/param-names": "error",
      "promise/always-return": "error",
      "promise/catch-or-return": "error",
      "promise/no-native": "off",
      "react/sort-comp": [
        "error",
        {
          "order": [
            "type-annotations",
            "static-methods",
            "lifecycle",
            "everything-else",
            "render"
          ]
        }
      ],
      "react/jsx-no-bind": "off",
      "react/jsx-filename-extension": [
        "error",
        { "extensions": [".js", ".jsx"] }
      ],
      // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
      // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    },
    env: {
      browser: true,
      node: true
    },
    settings: {
      react: {
        version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
      },
      "import/resolver": {
        webpack: {
          config: "configs/webpack.config.eslint.js"
        }
      }
    },
  };
  