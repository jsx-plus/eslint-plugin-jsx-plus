/**
 * @fileoverview eslint plugin for jsx plus
 * @author tony7lee
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require('requireindex');
// all rules in lib/rules
const rules = requireIndex(__dirname + '/rules');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

module.exports = {
  rules,
  processors: {},
  configs: {
    recommended: {
      plugins: ['jsx-plus'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        'jsx-plus/no-duplicate-directives': 2,
        'jsx-plus/valid-x-class': 2,
        'jsx-plus/valid-x-memo': 2,
        'jsx-plus/valid-x-for': 2,
        'jsx-plus/valid-x-slot': 2,
        'jsx-plus/no-duplicate-declaration-for-x-slot': 1,
        'jsx-plus/forbid-use-x-elseif-alone': 2,
        'jsx-plus/forbid-use-x-else-alone': 2,
        'jsx-plus/forbid-assignment-to-x-else': 2
      }
    },
    all: {
      plugins: ['jsx-plus'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        'jsx-plus/no-duplicate-directives': 2,
        'jsx-plus/valid-x-class': 2,
        'jsx-plus/valid-x-memo': 2,
        'jsx-plus/valid-x-for': 2,
        'jsx-plus/valid-x-slot': 2,
        'jsx-plus/no-duplicate-declaration-for-x-slot': 2,
        'jsx-plus/forbid-use-x-elseif-alone': 2,
        'jsx-plus/forbid-use-x-else-alone': 2,
        'jsx-plus/forbid-assignment-to-x-else': 2
      }
    }
  }
};
