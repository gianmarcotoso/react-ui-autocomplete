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

/* THE ACTUAL TESTS */
test('it renders with a simple array of options', t => {
    let options = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"]

    const wrapper = mount(
        <UIAutocomplete
            options={options}
            suggestionMinimumInputChar={0}
            suggestionUpdateInterval={0}
        />)

    t.equals(wrapper.find('.ui-autocomplete-suggestion-item').length, options.length)

    t.end()
})

test('it respects the maximum option limit', t => {
    let options = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"]

    const wrapper = mount(
        <UIAutocomplete
            options={options}

            suggestionMaxCount={3}
            suggestionMinimumInputChar={0}
            suggestionUpdateInterval={0}
        />)

    console.warn(wrapper.state(), wrapper.props())

    t.equals(wrapper.find('.ui-autocomplete-suggestion-item').length, 3)

    t.end()
})