/**
 * @fileoverview disallow duplicate directives
 * @author tony7lee
 */
'use strict';

const jsxUtil = require('jsx-ast-utils');
const { propName } = jsxUtil;

const { DIR_NAME } = require('../conf/directive-names');
const xDirectives = Object.keys(DIR_NAME).map(k => DIR_NAME[k]);

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'disallow duplicate directives',
      category: 'Possible Errors',
      recommended: true
    },
    fixable: null, // or "code" or "whitespace"
    schema: [],
    messages: {
      avoidDuplicateAttribute: `Avoid duplicate directive: {{ attrName }}`
    }
  },

  create: function(context) {
    const openingAttrs = new Set();

    return {
      JSXOpeningElement(node) {
        openingAttrs.clear();
      },
      JSXAttribute(node) {
        const attrName = propName(node);
        if (xDirectives.includes(attrName) && openingAttrs.has(attrName)) {
          context.report({
            node,
            messageId: 'avoidDuplicateAttribute',
            loc: node.loc,
            data: {
              attrName
            }
          });
        } else {
          openingAttrs.add(attrName);
        }
      }
    };
  }
};
