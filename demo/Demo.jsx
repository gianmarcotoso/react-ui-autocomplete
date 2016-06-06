import React from 'react';
import { Component } from 'react';
import './demo.css';
import UIAutocomplete from '../src'

class Demo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stringArrayValue: '',
            stringArrayFreeValue: '',
            objectArrayValue: null
        }
    }

    handleObjectArrayValueChange(v) {
        this.setState({objectArrayValue: v})
    }

    handleStringArrayValueChange(v) {
        this.setState({stringArrayValue: v})
    }

    handleStringArrayFreeValueChange(v) {
        this.setState({stringArrayFreeValue: v})
    }

    renderStringArrayOptionsDemo() {
        let stringArray = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"]

        return (
            <div>
                <div dangerouslySetInnerHTML={{__html: require('./md/stringArrayOptionsDemo.md')}} />

                <div style={{width: 200}}>
                    <UIAutocomplete
                        options={stringArray}
                        suggestionMinimumInputChar={0}

                        value={this.state.stringArrayValue}
                        onChange={this.handleStringArrayValueChange.bind(this)}
                    />
                </div>
                <p>My value is {this.state.stringArrayValue}</p>
            </div>
        )
    }

    renderStringArrayOptionsWithNewValueDemo() {
        let stringArray = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"]

        return (
            <div>
                <div dangerouslySetInnerHTML={{__html: require('./md/stringArrayOptionsWithNewValueDemo.md')}} />

                <div style={{width: 200}}>
                    <UIAutocomplete
                        options={stringArray}
                        suggestionMinimumInputChar={0}

                        value={this.state.stringArrayFreeValue}
                        onChange={this.handleStringArrayFreeValueChange.bind(this)}

                        allowNew={true}
                        newValueRequiresEnter={false}
                    />
                </div>
                <p>My value is {this.state.stringArrayFreeValue}</p>
            </div>
        )
    }

    renderObjectArrayOptionsDemo() {
        let objectArray = [{
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

        return (
            <div>
                <div dangerouslySetInnerHTML={{__html: require('./md/objectArrayOptionsDemo.md')}} />

                <div style={{width: 200}}>
                    <UIAutocomplete
                        options={objectArray}
                        suggestionMinimumInputChar={0}

                        value={this.state.objectArrayValue}
                        onChange={this.handleObjectArrayValueChange.bind(this)}

                        optionValue="id"
                        optionFilter={['name', 'surname']}
                        optionLabelRender={o => `${o.name} ${o.surname}`}
                    />
                </div>
                <p>My value is {this.state.objectArrayValue}</p>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h1>React UI Autocomplete</h1>
                <h2>A Demo!</h2>

                <hr/>
                {this.renderStringArrayOptionsDemo()}

                <hr/>
                {this.renderObjectArrayOptionsDemo()}

                <hr/>
                {this.renderStringArrayOptionsWithNewValueDemo()}

                <div style={{marginBottom: 300}}></div>
            </div>
        );
    }
}

Demo.propTypes = {

}

Demo.defaultProps = {

}

export default Demo;
