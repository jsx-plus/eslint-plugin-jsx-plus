/**
 * @fileoverview x-memo should have a valid value
 * @author tony7lee
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/valid-x-memo'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
});
ruleTester.run('valid-x-memo', rule, {
  valid: [
    {
      code: '<LongTemplate x-memo/>' // i.e. x-memo={true}
    },
    {
      code: `<LongTemplate x-memo={'id'}/>`
    }
  ],

  invalid: [
    {
      code: `<LongTemplate x-memo={undefined}> template </LongTemplate>`,
      errors: [
        {
          message:
            'value of x-memo should not be undefined/null: x-memo={undefined}'
        }
      ]
    },
    {
      code: `<LongTemplate x-memo={null}> template </LongTemplate>`,
      errors: [
        {
          message: 'value of x-memo should not be undefined/null: x-memo={null}'
        }
      ]
    }
  ]
});
