/**
 * @fileoverview some util tools.
 * @author tony7lee
 */

const {
  DIR_NAME: { X_SLOT }
} = require('../conf/directive-names');
const eslintScope = require('eslint-scope');
const REG_X_SLOT = new RegExp(`^${X_SLOT}:[$A-Z_][0-9A-Z_$]*$`, 'i');
const REG_PARTLY_X_SLOT = new RegExp(`^${X_SLOT}[:a-zA-Z$0-9_]*$`, 'i');

const {
  JSX_ELE_TYPE: { TEXT, ELEMENT }
} = require('../conf/jsx-names');

module.exports = {
  // exactly genertic estimate
  isExactEmpty(v) {
    return v === undefined || v === null;
  },
  isExactBoolean(v) {
    return v === true || v === false;
  },
  isExactString(v) {
    return typeof v === 'string';
  },
  isVariable(str) {
    if (typeof str !== 'string') {
      return false;
    }

    if (str.trim() !== str) {
      return false;
    }

    try {
      new Function(str, 'var ' + str);
    } catch (_) {
      return false;
    }

    return true;
  },

  // jsx type estimate
  isJSXText(node) {
    return node && node.type === TEXT;
  },
  isJSXElement(node) {
    return node && node.type === ELEMENT;
  },

  // directive name estimate
  isXSlot(name) {
    return REG_X_SLOT.test(name);
  },
  isPartlyXSlot(name) {
    return REG_PARTLY_X_SLOT.test(name);
  },

  /**
   * lint tool
   * @param {object(eslint context)} context context
   * @param {ast node} node node
   * @param {string} messageId messageId
   */
  lintMessage(context, node, messageId) {
    context.report({
      node,
      messageId,
      loc: node.loc
    });
  },

  /**
   * add variables to current scope for 'x-for/x-slot' directive
   * @param {object} context context
   * @param {Array} vars variables decclared by x-for/x-slot directive
   */
  addDeclaredVariables(context, vars) {
    const globalScope = context.getScope();
    vars.forEach(id => {
      let variable = globalScope.set.get(id);

      if (!variable) {
        variable = new eslintScope.Variable(id, globalScope);
        variable.eslintUsed = true;

        globalScope.variables.push(variable);
        globalScope.set.set(id, variable);
      }
    });

    /*
    * "through" contains all references which definitions cannot be found.
    * So, here remove the variables from current "through" scope.
    */
    globalScope.through = globalScope.through.filter(reference => {
      const name = reference.identifier.name;
      const variable = globalScope.set.get(name);

      if (variable) {
        /*
        * Links the variable and the reference.
        * And this reference is removed from `Scope#through`.
        */
        reference.resolved = variable;
        variable.references.push(reference);

        return false;
      }

      return true;
    });
  }
};
