/**
 * @fileoverview x-slot should have a valid name and value
 * @author tony7lee
 */
'use strict';

const jsxUtil = require('jsx-ast-utils');
const { getPropValue, propName } = jsxUtil;

const {
  isExactString,
  isXSlot,
  isPartlyXSlot,
  lintMessage
} = require('../utils/tools');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'x-slot should have a valid name and value',
      category: 'Possible Errors',
      recommended: true
    },
    fixable: null, // or "code" or "whitespace"
    schema: [],
    messages: {
      validXSlotName: `name of x-slot should be assigned. e.g. 'x-slot:header'`,
      validXSlotValue: `value of x-slot should be string or boolean true and can't be empty`
    }
  },

  create: function(context) {
    return {
      JSXOpeningElement(node) {
        node.attributes.forEach(attr => {
          if (attr.type !== 'JSXAttribute') return;
          
          const tempName = propName(attr);
          const tempValue = getPropValue(attr);
          const isExactXSlot = isXSlot(tempName);
          if (isPartlyXSlot(tempName) && !isExactXSlot) {
            lintMessage(context, attr, 'validXSlotName');
          } else if (
            isExactXSlot &&
            (tempValue !== true &&
              (tempValue === '' || !isExactString(tempValue)))
          ) {
            lintMessage(context, attr, 'validXSlotValue');
          }
        });
      }
    };
  }
};
