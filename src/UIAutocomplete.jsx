import React from 'react';
import { Component } from 'react';

const dotNotationLookup = (k, v) => k.split('.').reduce( (o,i) => o[i], v);

// Thanks, David Walsh: https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

class UIAutocomplete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayValue: '',
            value: props.value,
            suggestions: [],
            suggestionFocus: -1,
        };

        Object.defineProperty(this, 'value', {
            enumerable: true,
            get: () => this.state.value
        });

        if (props.suggestionUpdateInterval > 0) {
            this.updateSuggestions = debounce(this.updateSuggestions.bind(this), props.suggestionUpdateInterval);
        }

        this.handleComponentBlur = this.handleComponentBlur.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleComponentBlur);

        if (this.props.value) {
            this.setState({value: this.props.value}, this.resetInputValue);
        }

        this.updateSuggestions();
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value || this.props.options.length !== prevProps.options.length) {
            this.setState({value: this.props.value}, this.resetInputValue);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleComponentBlur);
    }

    handleComponentBlur() {
        if (this.refs.container.contains(event.target)) {
            return;
        }

        this.resetInputValue();
    }

    handleInputValueChange(event) {
        let displayValue = event.target.value;

        this.setState({displayValue}, () => {
            this.updateSuggestions();
        });
    }

    handleInputKeyDown(event) {
        if (event.keyCode === 13 && this.state.suggestions.length === 1) {
            event.preventDefault();
            this.handleSuggestionClick([...this.state.suggestions].pop());
            return;
        }

        if (event.keyCode === 13 && this.state.suggestionFocus !== -1) {
            event.preventDefault();
            this.handleSuggestionClick(this.state.suggestions[this.state.suggestionFocus]);
            return;
        }

        if (event.keyCode === 40 && this.state.suggestions.length > 0) {
            event.preventDefault();
            return this.focusNextSuggestion();
        }

        if (event.keyCode === 38 && this.state.suggestions.length > 0) {
            event.preventDefault();
            return this.focusPreviousSuggestion();
        }
    }

    handleInputKeyUp(event) {
        if (event.keyCode === 27) {
            this.resetInputValue();
        }
    }

    handleSuggestionClick(suggestion) {
        this.setState({
            displayValue: this.props.optionLabelRender(suggestion),
            value: suggestion[this.props.optionValue],
            suggestions: []
        }, () => {
            if (this.props.onChange) {
                this.props.onChange({target: this});
            }
        });
    }

    handleSuggestionHover(suggestion, index) {
        this.setState({
            suggestionFocus: index
        });
    }

    focusNextSuggestion() {
        let suggestionFocus = this.state.suggestionFocus + 1;

        if (suggestionFocus < this.state.suggestions.length) {
            this.setState({suggestionFocus});
        }
    }

    focusPreviousSuggestion() {
        let suggestionFocus = this.state.suggestionFocus - 1;

        if (suggestionFocus > -1) {
            this.setState({suggestionFocus});
        }
    }

    resetInputValue() {
        let current = this.props.options.filter(o => o[this.props.optionValue] == this.state.value).pop();
        if (!current) {
            this.setState({
                displayValue: '',
                value: 0,
                suggestions: []
            });

            return;
        }

        this.handleSuggestionClick(current);
    }

    updateSuggestions() {
        let value = this.state.displayValue;
        if (value.trim().length < this.props.suggestionMinimumInputChar) return this.setState({suggestions: []});

        let remaining = this.props.suggestionMaxCount;
        let suggestions = this.props.options.filter(i => {
			if (remaining <= 0) return false;

            if (i.constructor !== Object) {
                let result = i.toLowerCase().includes(value.toLowerCase())
				if (result) {
					remaining--
				}

				return result
            }

            if (Array.isArray(this.props.optionFilter)) {
                let or = this.props.optionFilter.filter( l => dotNotationLookup(l, i) && dotNotationLookup(l, i).includes ? dotNotationLookup(l, i).toLowerCase().includes(value.toLowerCase()) : false ).length > 0;
                let and = this.props.optionFilter.reduce( (r, n) => {
                    r = r + ' ' + dotNotationLookup(n, i)
                    return r;
                }, '').includes(value)

                if (or || and) {
                    remaining--
                }

                return or || and
            }
			let lookupValue = dotNotationLookup(this.props.optionFilter, i)
			if (!lookupValue) {
				return false
			}

            let result = lookupValue.toLowerCase().includes(value.toLowerCase())

			if (result) {
				remaining--
			}

			return result
        });

        this.setState({suggestions, suggestionFocus: -1});

    }

    render() {
        let className = [
            this.props.className,
            'ui-autocomplete'
        ].filter(e => !!e).join(' ');

        return (
            <div className={className} ref="container">
                <input type="text" ref="input" className={this.props.inputClassName} value={this.state.displayValue} onChange={this.handleInputValueChange.bind(this)} onKeyUp={this.handleInputKeyUp.bind(this)} onKeyDown={this.handleInputKeyDown.bind(this)} />

                {this.state.suggestions.length > 0 ? (
                    <div className="ui-autocomplete-suggestions">
                        {this.state.suggestions.map( (s, i) => (
                            <a href="javascript:;" key={i} className={`ui-autocomplete-suggestion-item ${i === this.state.suggestionFocus ? 'suggestion-focus' : ''}`} onClick={this.handleSuggestionClick.bind(this, s)} onMouseMove={this.handleSuggestionHover.bind(this, s, i)}>
                                {this.props.optionLabelRender(s)}
                            </a>
                        ) )}
                    </div>
                ) : null}
            </div>
        );
    }
}

UIAutocomplete.propTypes = {
    options: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object
    ])).isRequired,
    optionFilter: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    optionValue: React.PropTypes.string,
    optionLabelRender: React.PropTypes.func,

    suggestionMinimumInputChar: React.PropTypes.number,
    suggestionUpdateInterval: React.PropTypes.number,
    suggestionMaxCount: React.PropTypes.number,

    inputClassName: React.PropTypes.string,

    onChange: React.PropTypes.func,
    value: React.PropTypes.any,

    help: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node])
}

UIAutocomplete.defaultProps = {
    optionFilter: 'name',
    optionValue: 'value',
    optionLabelRender: o => o && o.constructor === Object ? o.name : o,

    suggestionMinimumInputChar: 2,
    suggestionUpdateInterval: 300,
    suggestionMaxCount: 10,

    inputClassName: ''
}

export default UIAutocomplete;
