/**
 * @fileoverview x-class should have a valid valu
 * @author tony7lee
 */
'use strict';

const jsxUtil = require('jsx-ast-utils');
const { hasProp, getProp, getPropValue } = jsxUtil;

const { isExactEmpty, isExactBoolean } = require('../utils/tools');

const {
  DIR_NAME: { X_CLASS }
} = require('../conf/directive-names');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'x-class should have a valid valu',
      category: 'Possible Errors',
      recommended: true
    },
    fixable: null, // or "code" or "whitespace"
    schema: [],
    messages: {
      validXClass: `value of x-class should not be empty or a boolean: x-class=\{{{ attrValue }}\}`
    }
  },

  create: function(context) {
    return {
      JSXOpeningElement(node) {
        const hasAttr = hasProp(node.attributes, X_CLASS);
        const attrValue = getPropValue(getProp(node.attributes, X_CLASS));

        if (hasAttr && (isExactEmpty(attrValue) || isExactBoolean(attrValue))) {
          context.report({
            node,
            messageId: 'validXClass',
            loc: node.loc,
            data: {
              attrValue
            }
          });
        }
      }
    };
  }
};
