## Allowing free input
If you want the UIAutocomplete input to behave as a standard `input` field but with the addition of suggestions, you can set the `allowNew` property to true. If you don't want the user to be required to press enter to confirm the entered value, you can set the `newValueRequiresEnter` option to `false`.

```
let options = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"]
let value = ''
let handleValueChange = v => {value = v}

<UIAutocomplete
    options={options}
    suggestionMinimumInputChar={0}

    value={value}
    onChange={handleValueChange}

    allowNew={true}
    newValueRequiresEnter={false}
/>
```
