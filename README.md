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

* Fill in provided rules here





