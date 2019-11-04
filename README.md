# eslint-plugin-jsx-plus

eslint plugin for jsx plus

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-jsx-plus`:

```
$ npm install eslint-plugin-jsx-plus --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-jsx-plus` globally.

## Usage

Add `jsx-plus` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "extends": [
        "react-app",
        "plugin:jsx-plus/recommended"
    ],
    "plugins": [
        "jsx-plus"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "jsx-plus/valid-x-for": 2
    }
}
```

## Supported Rules
- jsx-plus/no-duplicate-directives
- jsx-plus/valid-x-class
- jsx-plus/valid-x-memo
- jsx-plus/valid-x-for
- jsx-plus/valid-x-slot
- jsx-plus/no-duplicate-declaration-for-x-slot
- jsx-plus/forbid-use-x-elseif-alone
- jsx-plus/forbid-use-x-else-alone
- jsx-plus/forbid-assignment-to-x-else






