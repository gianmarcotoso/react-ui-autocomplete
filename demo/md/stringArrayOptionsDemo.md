## Passing a simple string array
You can pass a string array to the component, it will set the value to the selected string

```
let options = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"]
let value = ''
let handleValueChange = v => {value = v}

<UIAutocomplete
    options={options}
    suggestionMinimumInputChar={0}

    value={value}
    onChange={handleValueChange}
/>
```
