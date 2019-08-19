/**
 * @fileoverview x-class should have a valid valu
 * @author tony7lee
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/valid-x-class'),
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
ruleTester.run('valid-x-class', rule, {
  valid: [
    {
      code: `<div x-class={ 'foo' }></div>`
    },
    {
      code: `<div x-class={ this.state.clsNames }></div>`
    },
    {
      code: `<div x-class={{ foo: true, bar: false }}></div>`
    },
    {
      code: `<div x-class={['foo', {
        bar: true,
        active: false,
      }]}></div>`
    }
  ],

  invalid: [
    {
      code: `<div x-class={undefined}></div>`,
      errors: [
        {
          message:
            'value of x-class should not be empty or a boolean: x-class={undefined}'
        }
      ]
    },
    {
      code: `<div x-class={null}></div>`,
      errors: [
        {
          message:
            'value of x-class should not be empty or a boolean: x-class={null}'
        }
      ]
    },
    {
      code: `<div x-class></div>`, // i.e. x-class={true}
      errors: [
        {
          message:
            'value of x-class should not be empty or a boolean: x-class={true}'
        }
      ]
    },
    {
      code: `<div x-class={false}></div>`,
      errors: [
        {
          message:
            'value of x-class should not be empty or a boolean: x-class={false}'
        }
      ]
    }
  ]
});
