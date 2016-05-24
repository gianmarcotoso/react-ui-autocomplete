import React from 'react';
import { Component } from 'react';
import UIAutocomplete from '../src'

class Demo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            complexValue: null
        }
    }

    handleComplexValueChange(v) {
        this.setState({complexValue: v})
    }

    render() {
        let simpleOptions = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"]
        let complexOptions = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"].map((i,j) => ({
            id: j + 1,
            text: i
        }))

        return (
            <div>
                <h1>React UI Autocomplete</h1>
                <h2>A Demo!</h2>
                <hr/>

                <div style={{width: 200}}>
                    <UIAutocomplete
                        options={complexOptions}
                        suggestionMinimumInputChar={0}

                        value={this.state.complexValue}
                        onChange={this.handleComplexValueChange.bind(this)}

                        allowNew={true}
                        computeNewValueFromInput={v => complexOptions.length + 1}

                        optionValue="id"
                        optionFilter="text"
                        optionLabelRender={o => o.text}
                    />
                </div>

                <p>My value is {this.state.complexValue}</p>


            </div>
        );
    }
}

Demo.propTypes = {

}

Demo.defaultProps = {

}

export default Demo;
