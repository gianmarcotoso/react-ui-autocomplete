import test from 'tape'
import sinon from 'sinon'
import { mount } from 'enzyme'
import React from 'react'
import UIAutocomplete from './UIAutocomplete'

/* SETUP JSDOM */
var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});
global.navigator = {
  userAgent: 'node.js'
};

const ITEM_CLASS = '.ui-autocomplete-suggestion-item'
const KEY_DOWN = 40
const KEY_UP = 38
const KEY_ENTER = 13

/* THE ACTUAL TESTS */
test('it renders with a simple array of options', t => {
    let options = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"]

    const wrapper = mount(
        <UIAutocomplete
            options={options}
            suggestionMinimumInputChar={0}
            suggestionUpdateInterval={0}
        />)

    t.equals(wrapper.find(ITEM_CLASS).length, options.length)

    wrapper.find(ITEM_CLASS).forEach((c,i) => {
        t.equals(c.text(), options[i])
    })

    t.end()
})

test('it respects the maximum option limit on a simple array', t => {
    let options = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"]

    const wrapper = mount(
        <UIAutocomplete
            options={options}

            suggestionMaxCount={3}
            suggestionMinimumInputChar={0}
            suggestionUpdateInterval={0}
        />)

    t.equals(wrapper.find(ITEM_CLASS).length, 3)

    t.end()
})

test('it filters the options of a simple array based on user input', t => {
    let options = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"]

    const wrapper = mount(
        <UIAutocomplete
            options={options}

            suggestionUpdateInterval={0}
        />)

    wrapper.find('input').simulate('change', {target: {value: 'lo'}})
    // should find "Lorem" and "Dolor"
    t.equals(wrapper.find(ITEM_CLASS).length, 2)

    t.end()
})

test('it sets the correct value when selecting an option from a simple array', t => {
    let options = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"]
    let onChange = value => {
        t.equals(value, "Lorem")

        t.end()
    }

    let sandbox = sinon.sandbox.create()

    const spyInternalHandler = sandbox.spy(UIAutocomplete.prototype, 'handleSuggestionClick')

    const wrapper = mount(
        <UIAutocomplete
            options={options}

            onChange={onChange}
            suggestionMinimumInputChar={0}
            suggestionUpdateInterval={0}
        />)

    wrapper.find(ITEM_CLASS).first().simulate('click')

    t.ok(spyInternalHandler.calledOnce)
    t.equals(wrapper.instance().value, "Lorem")

    sandbox.restore()
})

test('it renders options based on an array of objects', t => {
    let options = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"].map((i, j) => ({
        id: 1 + j,
        text: i
    }))

    const wrapper = mount(
        <UIAutocomplete
            options={options}

            optionValue="id"
            optionFilter="text"
            optionLabelRender={o => o.text}

            suggestionMinimumInputChar={0}
            suggestionUpdateInterval={0}
        />)

    t.equals(wrapper.find(ITEM_CLASS).length, options.length)

    wrapper.find(ITEM_CLASS).forEach((c,i) => {
        t.equals(c.text(), options[i].text)
    })

    t.end()
})

test('it respects the maximum option limit on an array of objects', t => {
    let options = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"].map((i, j) => ({
        id: 1 + j,
        text: i
    }))

    const wrapper = mount(
        <UIAutocomplete
            options={options}

            optionValue="id"
            optionFilter="text"
            optionLabelRender={o => o.text}

            suggestionMaxCount={3}
            suggestionMinimumInputChar={0}
            suggestionUpdateInterval={0}
        />)

    t.equals(wrapper.find(ITEM_CLASS).length, 3)

    t.end()
})

test('it filters the options of an array of objects based on user input', t => {
    let options = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"].map((i, j) => ({
        id: 1 + j,
        text: i
    }))

    const wrapper = mount(
        <UIAutocomplete
            options={options}

            optionValue="id"
            optionFilter="text"
            optionLabelRender={o => o.text}

            suggestionUpdateInterval={0}
        />)

    wrapper.find('input').simulate('change', {target: {value: 'lo'}})
    // should find "Lorem" and "Dolor"
    t.equals(wrapper.find(ITEM_CLASS).length, 2)

    t.end()
})

test('it filters the options of an array of objects when the filter is on multiple properties', t => {
    let options = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"].map((i, j) => ({
        id: 1 + j,
        reversedText: i.split('').reverse().join(''),
        text: i
    }))

    const wrapper = mount(
        <UIAutocomplete
            options={options}

            optionValue="id"
            optionFilter={['text', 'reversedText']}
            optionLabelRender={o => o.text}

            suggestionUpdateInterval={0}
        />)

    wrapper.find('input').simulate('change', {target: {value: 'em'}})
    // should find "Lorem" and "Amet"
    t.equals(wrapper.find(ITEM_CLASS).length, 2)

    t.end()
})

test('it sets the correct value when selecting an option from an object array', t => {
    let options = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"].map((i, j) => ({
        id: 1 + j,
        text: i
    }))

    let onChange = (value, displayValue, suggestion) => {
        t.equals(value, 1)
        t.deepEquals(options[0], suggestion)

        t.end()
    }

    let sandbox = sinon.sandbox.create()

    const spyInternalHandler = sandbox.spy(UIAutocomplete.prototype, 'handleSuggestionClick')

    const wrapper = mount(
        <UIAutocomplete
            options={options}

            onChange={onChange}

            optionValue="id"
            optionFilter="text"
            optionLabelRender={o => o.text}

            suggestionMinimumInputChar={0}
            suggestionUpdateInterval={0}
        />)

    wrapper.find(ITEM_CLASS).first().simulate('click')

    t.ok(spyInternalHandler.calledOnce)
    t.equals(wrapper.instance().value, 1)

    sandbox.restore()
})

test('it focuses the appropriate suggestion when using arrow keys and selects it with return', t => {
    let options = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"]

    const wrapper = mount(
        <UIAutocomplete
            options={options}

            suggestionMinimumInputChar={0}
            suggestionUpdateInterval={0}
        />)

    wrapper.find('input').simulate('keydown', {keyCode: KEY_DOWN})
    wrapper.find('input').simulate('keydown', {keyCode: KEY_DOWN})
    wrapper.find('input').simulate('keydown', {keyCode: KEY_ENTER})

    // We should have selected the second option...
    t.equals(wrapper.instance().value, "Ipsum")

    wrapper.find('input').simulate('change', {target: {value: 'lo'}})
    wrapper.find('input').simulate('keydown', {keyCode: KEY_DOWN})
    wrapper.find('input').simulate('keydown', {keyCode: KEY_DOWN})
    wrapper.find('input').simulate('keydown', {keyCode: KEY_UP})
    wrapper.find('input').simulate('keydown', {keyCode: KEY_ENTER})

    // We should have selected the first option...
    t.equals(wrapper.instance().value, "Lorem")

    t.end()
})

test('it selects the only available option when pressing return with one suggestion', t => {
    let options = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"]

    const wrapper = mount(
        <UIAutocomplete
            options={options}

            suggestionMinimumInputChar={0}
            suggestionUpdateInterval={0}
        />)

    wrapper.find('input').simulate('change', {target: {value: 'lorem'}})
    wrapper.find('input').simulate('keydown', {keyCode: KEY_ENTER})

    t.equals(wrapper.instance().value, "Lorem")

    t.end()
})

test('it waits the specified interval before updating suggestions', t => {
    let options = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"]

    const wrapper = mount(
        <UIAutocomplete
            options={options}

            suggestionMinimumInputChar={0}
            suggestionUpdateInterval={300}
        />)

    wrapper.find('input').simulate('change', {target: {value: 'lo'}})

    // No time has passed, so no suggestion is available yet! But we have already typed something
    t.equals(wrapper.find(ITEM_CLASS).length, 0)
    setTimeout(() => {
        t.equals(wrapper.find(ITEM_CLASS).length, 2)

        t.end()
    }, 500)
})

test('it behaves as a controlled component when both value and onchange are set', t => {
    let options = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"].map((i,j) => ({
        id: 1 + j,
        text: i
    }))

    let value = 2

    const wrapper = mount(
        <UIAutocomplete
            options={options}

            value={value}
            onChange={v => {
                value = v
            }}

            optionValue="id"
            optionFilter="text"
            optionLabelRender={o => o.text}

            suggestionMinimumInputChar={0}
            suggestionUpdateInterval={0}
        />)

    t.equals(wrapper.instance().value, 2)
    t.equals(wrapper.state().displayValue, "Ipsum")

    wrapper.find('input').simulate('change', {target: {value: ''}})
    wrapper.find(ITEM_CLASS).first().simulate('click')

    t.equals(value, 1)
    t.equals(wrapper.state().displayValue, "Lorem")

    t.end()
})

test('it allows for the creation of a new value', t => {
    let options = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"].map((i,j) => ({
        id: 1 + j,
        text: i
    }))

    let onChange = (v, d) => {
        options.push({id: v, text: d})
    }

    let value = 2

    const wrapper = mount(
        <UIAutocomplete
            options={options}

            onChange={onChange}

            optionValue="id"
            optionFilter="text"
            optionLabelRender={o => o.text}

            allowNew={true}
            computeNewValueFromInput={v => 1 + options.length}

            suggestionMinimumInputChar={0}
            suggestionUpdateInterval={0}
        />)

    wrapper.find('input').simulate('change', {target: {value: 'Neque'}})
    wrapper.find('input').simulate('keydown', {keyCode: KEY_ENTER})

    t.equals(wrapper.instance().value, 6)
    t.equals(options.length, 6)
    t.equals(options[5].id, 6)
    t.equals(options[5].text, "Neque")

    t.end()
})
