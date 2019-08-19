/**
 * @fileoverview No need to assign x-else a value
 * @author tony7lee
 */
'use strict';

const jsxUtil = require('jsx-ast-utils');
const { hasProp, getProp, getPropValue,  } = jsxUtil;

const {
  DIR_NAME: { X_ELSE }
} = require('../conf/directive-names');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'No need to assign x-else a value',
      category: 'Best Practices',
      recommended: true
    },
    fixable: null, // or "code" or "whitespace"
    schema: [],
    messages: {
      noAssignXElse: `No need to assign x-else a value: x-else=\{{{ attrValue }}\}`
    }
  },

  create: function(context) {
    return {
      JSXOpeningElement(node) {
        const hasAttr = hasProp(node.attributes, X_ELSE);
        const attrProp = getProp(node.attributes, X_ELSE);
        const attrValue = getPropValue(attrProp);

        if (hasAttr && attrValue !== true) {
          context.report({
            node,
            messageId: 'noAssignXElse',
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
