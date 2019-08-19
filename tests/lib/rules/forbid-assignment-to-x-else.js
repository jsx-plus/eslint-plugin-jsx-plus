/**
 * @fileoverview No need to assign x-else a value
 * @author tony7lee
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/forbid-assignment-to-x-else'),
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
ruleTester.run('forbid-assignment-to-x-else', rule, {
  valid: [
    {
        // i.e. x-else={true}
        code: `
            <div>
                <p x-if={this.state.foo}></p>
                <p x-else></p>
            </div>
        `
    }
  ],

  invalid: [
    {
      code: `
            <div>
                <p x-if={this.state.foo}></p>
                <p x-else={this.state.bar}></p>
            </div>
            `,
      errors: [
        {
          message: 'No need to assign x-else a value: x-else={this.state.bar}'
        }
      ]
    },
    {
        code: `
              <div>
                  <p x-if={this.state.foo}></p>
                  <p x-else={undefined}></p>
              </div>
              `,
        errors: [
          {
            message: 'No need to assign x-else a value: x-else={undefined}'
          }
        ]
      }
  ]
});
