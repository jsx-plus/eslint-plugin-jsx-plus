/**
 * @fileoverview x-for should have a valid value
 * @author tony7lee
 */
'use strict';

const jsxUtil = require('jsx-ast-utils');
const { propName } = jsxUtil;

const {
  DIR_NAME: { X_FOR },
  OPERATORS: { IN }
} = require('../conf/directive-names');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'x-for should have a valid value',
      category: 'Possible Errors',
      recommended: true
    },
    fixable: null, // or "code" or "whitespace"
    schema: [],
    messages: {
      expressionNeeded: `x-for directive need a expression like: x-for={(item, index) in this.state.foo}`,
      inStatementNeeded: `'in' syntax is necessary to x-for directive`,
      spaceBeforeInStatementNeeded: `x-for directive need a space before 'in' syntax`,
      spaceAfterInStatementNeeded: `x-for directive need a space after 'in' syntax`
    }
  },

  create: function(context) {
    return {
      JSXAttribute(node) {
        const attrName = propName(node);

        if (attrName !== X_FOR) return;

        const sourceCode = context.getSourceCode();
        const first = sourceCode.getFirstToken(node);
        const second = sourceCode.getTokenAfter(first);
        const start = sourceCode.getTokenAfter(second);
        const end = sourceCode.getLastToken(node);
        const btw = sourceCode.getTokensBetween(start, end);
        const btwLen = btw.length;
        let tokenIn;
        btw.forEach(i => {
          if (i.value === IN) {
            tokenIn = i;
          }
        });
        let tokenBeforeIn;
        let tokenAfterIn;
        if (tokenIn) {
          tokenBeforeIn = sourceCode.getTokenBefore(tokenIn);
          tokenAfterIn = sourceCode.getTokenAfter(tokenIn);
        }

        // x-for need a expression
        if (btwLen < 3) {
          context.report({
            node,
            messageId: 'expressionNeeded',
            loc: node.loc
          });
        }

        // 'in' statement needed.
        else if (!tokenIn) {
          context.report({
            node,
            messageId: 'inStatementNeeded',
            loc: node.loc
          });
        }

        // a space needed before 'in' statement.
        else if (!sourceCode.isSpaceBetweenTokens(tokenBeforeIn, tokenIn)) {
          context.report({
            tokenIn,
            messageId: 'spaceBeforeInStatementNeeded',
            loc: tokenIn.loc
          });
        }

        // a space needed after 'in' statement.
        else if (!sourceCode.isSpaceBetweenTokens(tokenIn, tokenAfterIn)) {
          context.report({
            tokenIn,
            messageId: 'spaceAfterInStatementNeeded',
            loc: tokenIn.loc
          });
        }
      }
    };
  }
};
