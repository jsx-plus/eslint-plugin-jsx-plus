/**
 * @fileoverview x-for should have a valid value
 * @author tony7lee
 */
'use strict';

const jsxUtil = require('jsx-ast-utils');
const { propName } = jsxUtil;
const { isVariable, addDeclaredVariables } = require('../utils/tools');
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
      expressionNeeded: `x-for directive need a expression e.g. x-for={(item, index) in this.state.foo}`,
      inStatementNeeded: `'in' syntax is necessary to x-for directive`,
      variablesDeclarationNeeded: `variables is necessary to x-for directive, e.g. x-for={(item, index) in this.state.foo}, x-for={item in this.state.foo}`,
      spaceBeforeInStatementNeeded: `x-for directive need a space before 'in' syntax`,
      spaceAfterInStatementNeeded: `x-for directive need a space after 'in' syntax`
    }
  },

  create: function(context) {
    let xForVars = null;
    return {
      'Program:exit'() {
        if (xForVars) {
          xForVars.length && addDeclaredVariables(context, xForVars);
          xForVars = null;
        }
      },
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
        // 'in' identifier exist
        if (tokenIn) {
          tokenBeforeIn = sourceCode.getTokenBefore(tokenIn);
          tokenAfterIn = sourceCode.getTokenAfter(tokenIn);
          // get the variables declared in the expression
          const tokensBtwStartIn =
            sourceCode.getTokensBetween(start, tokenIn) || [];
          const xForVariablesToken = tokensBtwStartIn.filter(i => {
            return isVariable(i.value);
          });

          if (xForVariablesToken.length) {
            // cache variables of current scope from x-for
            xForVars = [
              ...new Set([
                ...(xForVars || []),
                ...xForVariablesToken.map(i => i.value)
              ])
            ];
          } else {
            // x-for need a variable expression
            const cloestNode =
              (tokensBtwStartIn.length && tokensBtwStartIn[0]) || start;
            context.report({
              node: cloestNode,
              messageId: 'variablesDeclarationNeeded',
              loc: cloestNode.loc
            });
          }
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
