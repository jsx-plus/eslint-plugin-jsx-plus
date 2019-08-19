/**
 * @fileoverview x-slot should not be declared with the same name
 * @author tony7lee
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-duplicate-declaration-for-x-slot'),
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
ruleTester.run('no-duplicate-declaration-for-x-slot', rule, {
  valid: [
    {
      code: `
        <WaterFall>
            <view x-slot:header>header</view>
            <view x-slot:item="props">item: {props.item}</view>
            <view x-slot:footer>footer</view>
        </WaterFall>
      `
    }
  ],

  invalid: [
    {
      code: `
        <WaterFall>
            <view x-slot:header>foo</view>
            <view x-slot:item="props">item: {props.item}</view>
            <view x-slot:header>bar</view>
        </WaterFall>
      `,
      errors: [
        {
          message: 'x-slot should not be declared with the same name'
        }
      ]
    },

    {
      code: `
          <WaterFall>
              <view x-slot:header>foo</view>
              <view x-slot:header="props">bar</view>
          </WaterFall>
        `,
      errors: [
        {
          message: 'x-slot should not be declared with the same name'
        }
      ]
    }
  ]
});
