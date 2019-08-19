# x-else should have a x-if / x-elseif ahead (forbid-use-x-else-alone)

Please describe the origin of the rule here.


## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
<div>
  <div x-if={this.state.foo}>1</div>
  <div x-else>1</div>
  <div x-else>2</div>
</div>
```

Examples of **correct** code for this rule:

```js
<div>
  <div x-if={this.state.foo}>1</div>
  <div x-elseif={this.state.bar}>1</div>
  <div x-elseif={this.state.boo}>1</div>
  <div x-else>1</div>
</div>
```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
