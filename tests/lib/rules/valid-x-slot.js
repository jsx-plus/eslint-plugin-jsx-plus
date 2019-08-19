/**
 * @fileoverview x-slot should have a valid name and value
 * @author tony7lee
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/valid-x-slot'),
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
ruleTester.run('valid-x-slot', rule, {
  valid: [
    {
      code: `<view x-slot:header>header</view>`
    },
    {
      code: `<view x-slot:item="props">item: {props.item}</view>`
    }
  ],

  invalid: [
    {
      code: `<view x-slot></view>`,
      errors: [
        {
          message: `name of x-slot should be assigned. e.g. 'x-slot:header'`
        }
      ]
    },

    {
      code: `<view x-slot:item={''}>item</view>`,
      errors: [
        {
          message: `value of x-slot should be string or boolean true and can't be empty`
        }
      ]
    },
    {
      code: `<view x-slot:item={false}>item</view>`,
      errors: [
        {
          message: `value of x-slot should be string or boolean true and can't be empty`
        }
      ]
    },
    {
      code: `<view x-slot:item={[]}>item</view>`,
      errors: [
        {
          message: `value of x-slot should be string or boolean true and can't be empty`
        }
      ]
    },
    {
      code: `<view x-slot:item={{}}>item</view>`,
      errors: [
        {
          message: `value of x-slot should be string or boolean true and can't be empty`
        }
      ]
    }
  ]
});
