/**
 * @fileoverview x-else should have a x-if or x-elseif ahead
 * @author tony7lee
 */
'use strict';

const jsxUtil = require('jsx-ast-utils');
const { hasProp, getProp } = jsxUtil;

const { isJSXText, isJSXElement, lintMessage } = require('../utils/tools');

const {
  DIR_NAME: { X_IF, X_ELSEIF, X_ELSE }
} = require('../conf/directive-names');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'x-else should have a x-if or x-elseif ahead',
      category: 'Possible Errors',
      recommended: true
    },
    fixable: null, // or "code" or "whitespace"
    schema: [],
    messages: {
      oneIfStatementNeededAhead: `x-else should have a x-if or x-elseif ahead`
    }
  },

  create: function(context) {
    return {
      JSXElement(node) {
        let attrProp;
        const hasAttr = hasProp(node.openingElement.attributes, X_ELSE);
        if (!hasAttr) return;

        attrProp = getProp(node.openingElement.attributes, X_ELSE);

        // JSXText JSXElement
        const siblings = node.parent && node.parent.children;
        if (!siblings) return;
        let curIndex = null;
        siblings.forEach((i, ii) => {
          if (i === node) {
            curIndex = ii;
          }
        });

        let closestSiblint;
        for (let i = curIndex - 1; i >= 0; i--) {
          const temp = siblings[i];
          if (isJSXText(temp) && temp.value.trim() === '') {
            continue;
          } else if (isJSXElement(temp)) {
            closestSiblint = temp;
            break;
          }
        }

        // x-elseif should have a x-if or x-elseif ahead
        if (closestSiblint) {
          const siblingOpening = closestSiblint.openingElement.attributes;
          const siblingHasIfState = hasProp(siblingOpening, X_IF);
          const siblingHasElseIfState = hasProp(siblingOpening, X_ELSEIF);
          if (!siblingHasIfState && !siblingHasElseIfState) {
            lintMessage(context, attrProp, 'oneIfStatementNeededAhead');
          }
        } else {
          lintMessage(context, attrProp, 'oneIfStatementNeededAhead');
        }
      }
    };
  }
};
