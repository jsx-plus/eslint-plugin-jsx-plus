# No need to assign x-else a value (forbid-assignment-to-x-else)

Please describe the origin of the rule here.


## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
<div>
  <p x-if={this.state.foo}></p>
  <p x-else={this.state.bar}></p>
</div>
```

Examples of **correct** code for this rule:

```js
<div>
  <p x-if={this.state.foo}></p>
  <p x-else></p>
</div>
```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
