/**
 * @fileoverview disallow duplicate directives
 * @author tony7lee
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-duplicate-directives'),
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
ruleTester.run('no-duplicate-directives', rule, {
  valid: [
    {
      code: '<Button x-if={this.state.foo} />'
    },
    {
      code: '<Button style={{ fontSize: 14 }} style={{ width: 100 }} />'
    }
  ],

  invalid: [
    {
      code: `<Button x-if={this.state.foo} x-if={this.state.bar} />`,
      errors: [{ message: 'Avoid duplicate directive: x-if' }]
    },
    {
      code: `<Button x-class={this.state.foo} x-class={this.state.bar} />`,
      errors: [{ message: 'Avoid duplicate directive: x-class' }]
    }
  ]
});
