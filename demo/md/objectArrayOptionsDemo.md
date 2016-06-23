## Passing an array of objects
When passing an array of objects you must specify which property represents the value and how the suggestions should be rendered. You must also specify which properties the component should filter on:

```
let options = [{
    id: 1,
    name: "John",
    surname: "Smith",
    age: 26
}, {
    id: 2,
    name: "John",
    surname: "Constantine",
    age: 26    
}, {
    id: 3,
    name: "Long",
    surname: "John Silver",
    age: 26
}, {
    id: 4,
    name: "Johnny",
    surname: "Guitar",
    age: 26
}, {
    id: 5,
    name: "Rob",
    surname: "White",
    age: 32
}, {
    id: 6,
    name: "Frank",
    surname: "Black",
    age: 53
}]

let value = 0
let handleValueChange = v => {value = v}

<UIAutocomplete
    options={options}
    suggestionMinimumInputChar={0}

    optionValue="id"
    optionFilter={['name', 'surname']}
    optionLabelRender={o => o.name + ' ' + o.surname}

    value={value}
    onChange={handleValueChange}
/>
```
