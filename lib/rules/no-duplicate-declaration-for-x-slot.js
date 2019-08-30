/**
 * @fileoverview x-slot should not be declared with the same name
 * @author tony7lee
 */
'use strict';

const jsxUtil = require('jsx-ast-utils');
const { propName } = jsxUtil;

const { isXSlot, isJSXElement, lintMessage } = require('../utils/tools');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'x-slot should not be declared with the same name',
      category: 'Best Practices',
      recommended: true
    },
    fixable: null, // or "code" or "whitespace"
    schema: [],
    messages: {
      noSameXSlotName: `x-slot should not be declared with the same name`
    }
  },

  create: function(context) {
    const slotNames = new Set();

    return {
      JSXElement(node) {
        slotNames.clear();
        node.children &&
          node.children.forEach(child => {
            if (!isJSXElement(child)) return;
            child.openingElement.attributes.forEach(attr => {
              if (attr.type !== 'JSXAttribute') return;
              
              const tempName = propName(attr);
              if (!isXSlot(tempName)) return;

              if (slotNames.has(tempName)) {
                lintMessage(context, attr, 'noSameXSlotName');
              } else {
                slotNames.add(tempName);
              }
            });
          });
      }
    };
  }
};
