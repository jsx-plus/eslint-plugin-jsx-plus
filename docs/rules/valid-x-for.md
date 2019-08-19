# x-for should have a valid value (valid-x-for)

Please describe the origin of the rule here.


## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
<View x-for></View>
<View x-for={this.state.foo}></View>
<View x-for={(item, key)in foo}>key: {key}, item: {item}</View>
<View x-for={(item, key) in[ 1, 2, 3 ]}>key: {key}, item: {item}</View>
```

Examples of **correct** code for this rule:

```js
<View x-for={(item, key) in foo}>key: {key}, item: {item}</View>
```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
