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
