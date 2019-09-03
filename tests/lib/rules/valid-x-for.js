/**
 * @fileoverview x-for should have a valid value
 * @author tony7lee
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/valid-x-for'),
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
ruleTester.run('valid-x-for', rule, {
  valid: [
    {
      code: `<View x-for={(item, key) in foo}>key: {key}, item: {item}</View>`
    },
    {
      code: `<View x-for={item in foo}>item: {item}</View>`
    }
  ],

  invalid: [
    {
      code: `<View x-for></View>`,
      errors: [
        {
          message: `x-for directive need a expression e.g. x-for={(item, index) in this.state.foo}`
        }
      ]
    },
    {
      code: `<View x-for={this.state.foo}></View>`,
      errors: [
        {
          message: `'in' syntax is necessary to x-for directive`
        }
      ]
    },
    {
      code: `<View x-for={1 in this.state.foo}></View>`,
      errors: [
        {
          message: `variables is necessary to x-for directive, e.g. x-for={(item, index) in this.state.foo}, x-for={item in this.state.foo}`
        }
      ]
    },
    {
      code: `<View x-for={(item, key)in foo}>key: {key}, item: {item}</View>`,
      errors: [
        {
          message: `x-for directive need a space before 'in' syntax`
        }
      ]
    },
    {
      code: `<View x-for={(item, key) in[ 1, 2, 3 ]}>key: {key}, item: {item}</View>`,
      errors: [
        {
          message: `x-for directive need a space after 'in' syntax`
        }
      ]
    }
  ]
});
