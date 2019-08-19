/**
 * @fileoverview x-memo should have a valid value
 * @author tony7lee
 */
'use strict';

const jsxUtil = require('jsx-ast-utils');
const { hasProp, getProp, getPropValue } = jsxUtil;

const { isExactEmpty } = require('../utils/tools');

const { DIR_NAME: { X_MEMO } } = require('../conf/directive-names');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'x-memo should have a valid value',
      category: 'Possible Errors',
      recommended: true
    },
    fixable: null, // or "code" or "whitespace"
    schema: [],
    messages: {
      validXMemo: `value of x-memo should not be undefined/null: x-memo=\{{{ attrValue }}\}`
    }
  },

  create: function(context) {
    return {
      JSXOpeningElement(node) {
        const hasAttr = hasProp(node.attributes, X_MEMO);
        const attrValue = getPropValue(getProp(node.attributes, X_MEMO));

        if (hasAttr && isExactEmpty(attrValue)) {
          context.report({
            node,
            messageId: 'validXMemo',
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
