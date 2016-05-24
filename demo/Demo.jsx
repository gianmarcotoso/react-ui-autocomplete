import React from 'react';
import { Component } from 'react';
import './demo.css';
import UIAutocomplete from '../src'

class Demo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            simpleValue: null,
            complexValue: null
        }
    }

    handleComplexValueChange(v) {
        this.setState({complexValue: v})
    }

    handleSimpleValueChange(v) {
        this.setState({simpleValue: v})
    }

    render() {
        let simpleOptions = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"]
        let complexOptions = [{
            id: 1,
            name: "John",
            surname: "Smith",
            age: 26
        }, {
            id: 1,
            name: "John",
            surname: "Constantine",
            age: 26
        }, {
            id: 1,
            name: "Long",
            surname: "John Silver",
            age: 26
        }, {
            id: 1,
            name: "Johnny",
            surname: "Guitar",
            age: 26
        }, {
            id: 2,
            name: "Rob",
            surname: "White",
            age: 32
        }, {
            id: 3,
            name: "Frank",
            surname: "Black",
            age: 53
        }]

        return (
            <div>
                <h1>React UI Autocomplete</h1>
                <h2>A Demo!</h2>
                <hr/>
                <h2>Passing a simple string array</h2>
                <p>You can pass a string array to the component, it will set the value to the selected string</p>
                <pre>
                    {`
let options = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"]
let value = ''
let handleValueChange = v => {value = v}

<UIAutocomplete
    options={options}
    suggestionMinimumInputChar={0}

    value={value}
    onChange={handleValueChange}
/>
                    `}
                </pre>
                <div style={{width: 200}}>
                    <UIAutocomplete
                        options={simpleOptions}
                        suggestionMinimumInputChar={0}

                        value={this.state.simpleValue}
                        onChange={this.handleSimpleValueChange.bind(this)}
                    />
                </div>
                <p>My value is {this.state.simpleValue}</p>

                <hr/>
                <h2>Passing an array of objects</h2>
                <p>When passing an array of objects you must specify which property represents the value and how the suggestions should be rendered. You must also specify which properties the component should filter on:</p>
                <pre>
                    {`
let options = [{
    id: 1,
    name: "John",
    surname: "Smith",
    age: 26
}, {
    id: 2,
    name: "Rob",
    surname: "White",
    age: 32
}, {
    id: 3,
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
                    `}
                </pre>

                <div style={{width: 200}}>
                    <UIAutocomplete
                        options={complexOptions}
                        suggestionMinimumInputChar={0}

                        value={this.state.complexValue}
                        onChange={this.handleComplexValueChange.bind(this)}

                        optionValue="id"
                        optionFilter={['name', 'surname']}
                        optionLabelRender={o => `${o.name} ${o.surname}`}
                    />
                </div>

                <div style={{marginBottom: 600}}></div>
            </div>
        );
    }
}

Demo.propTypes = {

}

Demo.defaultProps = {

}

export default Demo;
