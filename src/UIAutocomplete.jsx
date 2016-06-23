import React from 'react'
import { Component } from 'react'
import dotNotationLookup from './utils/dotNotationLookup'
import debounce from './utils/debounce'

class UIAutocomplete extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayValue: '',
            value: props.value,
            suggestions: [],
            suggestionFocus: -1,
			hasFocus: false
        }

        Object.defineProperty(this, 'value', {
            enumerable: true,
            get: this.getValue
        })

        if (props.suggestionUpdateInterval > 0) {
            this.updateSuggestions = debounce(this.updateSuggestions.bind(this), props.suggestionUpdateInterval)
        }

        this.handleComponentBlur = this.handleComponentBlur.bind(this)
        this.handleComponentFocus = this.handleComponentFocus.bind(this)
        this.handleInputValueChange = this.handleInputValueChange.bind(this)
        this.handleInputKeyUp = this.handleInputKeyUp.bind(this)
        this.handleInputKeyDown = this.handleInputKeyDown.bind(this)
    }

    componentDidMount() {
        document.addEventListener('click', this.handleComponentBlur)

        if (this.props.value) {
            this.setState({value: this.props.value}, this.resetInputValue)
        }

        this.updateSuggestions()
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.setState({value: this.props.value}, this.resetInputValue)
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleComponentBlur)
    }

    handleComponentBlur() {
        if (this.refs.container.contains(event.target)) {
            return
        }

		this.setState({hasFocus: false}, this.resetInputValue)
    }

	handleComponentFocus() {
		this.setState({hasFocus: true})
	}

    handleInputValueChange(event) {
        let displayValue = event.target.value

        this.setState({displayValue}, () => {
            this.updateSuggestions()

			if (this.props.allowNew && !this.props.newValueRequiresEnter) {
				this.updateValueBasedOnInput()
			}
        })
    }

    handleInputKeyDown(event) {
		if (event.keyCode === 13 && this.state.suggestionFocus !== -1) {
            event.preventDefault()
            this.updateValueBasedOnSuggestion(this.state.suggestions[this.state.suggestionFocus])
            return
        }

        if (event.keyCode === 13 && !this.props.allowNew && this.state.suggestions.length === 1) {
            event.preventDefault()
            this.updateValueBasedOnSuggestion([...this.state.suggestions].pop())
            return
        }

		if (event.keyCode === 13 && this.props.allowNew) {
            event.preventDefault()
            this.updateValueBasedOnInput()
            return
        }

        if (event.keyCode === 40 && this.state.suggestions.length > 0) {
            event.preventDefault()
            return this.focusNextSuggestion()
        }

        if (event.keyCode === 38 && this.state.suggestions.length > 0) {
            event.preventDefault()
            return this.focusPreviousSuggestion()
        }
    }

    handleInputKeyUp(event) {
        if (event.keyCode === 27) {
            this.resetInputValue()
        }
    }

    handleSuggestionClick(suggestion) {
        this.updateValueBasedOnSuggestion(suggestion)
    }

    handleSuggestionHover(suggestion, index) {
        this.setState({
            suggestionFocus: index
        })
    }

    focusNextSuggestion() {
        let suggestionFocus = this.state.suggestionFocus + 1

        if (suggestionFocus < this.state.suggestions.length) {
            this.setState({suggestionFocus})
        }
    }

    focusPreviousSuggestion() {
        let suggestionFocus = this.state.suggestionFocus - 1

        if (suggestionFocus > -1) {
            this.setState({suggestionFocus})
        }
    }

    resetInputValue() {
		if (!this.props.allowNew) {
	        let current = this.props.options.find(o => o[this.props.optionValue] == this.state.value)
	        if (!current) {
	            this.setState({
	                displayValue: '',
	                value: 0,
	                suggestions: []
	            })

	            return
	        }

	        this.updateValueBasedOnSuggestion(current)
		}
    }

	updateValueBasedOnSuggestion(suggestion) {
		this.setState({
            displayValue: this.props.optionLabelRender(suggestion),
            value: suggestion.constructor === Object  ? suggestion[this.props.optionValue] : suggestion,
            suggestions: []
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.value, this.state.displayValue, suggestion)
            }
        })
	}

	updateValueBasedOnInput() {
		let value = this.refs.input.value

		this.setState({value: this.props.computeNewValueFromInput(value), displayValue: value}, () => {
			if (this.props.onChange) {
				this.props.onChange(this.state.value, this.state.displayValue)
			}
		})
	}

    updateSuggestions() {
        let value = this.state.displayValue
        if (value.trim().length < this.props.suggestionMinimumInputChar) return this.setState({suggestions: []})

        let remaining = this.props.suggestionMaxCount
        let suggestions = this.props.options.filter(i => {
			if (remaining <= 0) return false

            if (i.constructor !== Object) {
                let result = i.toLowerCase().includes(value.toLowerCase())
				if (result) {
					remaining--
				}

				return result
            }

            if (Array.isArray(this.props.optionFilter)) {
                let or = this.props.optionFilter.filter( l => dotNotationLookup(l, i) && dotNotationLookup(l, i).includes ? dotNotationLookup(l, i).toLowerCase().includes(value.toLowerCase()) : false ).length > 0
                let and = this.props.optionFilter.reduce( (r, n) => {
                    r = r + ' ' + dotNotationLookup(n, i)
                    return r
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
        })

        this.setState({suggestions, suggestionFocus: -1})

    }

	getValue() {
		return this.state.value
	}

    render() {
        let className = [
            this.props.className,
            'ui-autocomplete'
        ].filter(e => !!e).join(' ')

        return (
            <div className={className} ref="container">
                <input type="text" ref="input" className={this.props.inputClassName} value={this.state.displayValue} onFocus={this.handleComponentFocus} onChange={this.handleInputValueChange} onKeyUp={this.handleInputKeyUp} onKeyDown={this.handleInputKeyDown} />

                {this.state.suggestions.length > 0 && this.state.hasFocus ? (
                    <div className="ui-autocomplete-suggestions">
                        {this.state.suggestions.map( (s, i) => (
                            <a href="javascript:" key={i} className={`ui-autocomplete-suggestion-item ${i === this.state.suggestionFocus ? 'suggestion-focus' : ''}`} onClick={this.handleSuggestionClick.bind(this, s)} onMouseMove={this.handleSuggestionHover.bind(this, s, i)}>
                                {this.props.optionLabelRender(s)}
                            </a>
                        ) )}
                    </div>
                ) : null}
            </div>
        )
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

	allowNew: React.PropTypes.bool,
	computeNewValueFromInput: React.PropTypes.func,
	newValueRequiresEnter: React.PropTypes.bool,

    onChange: React.PropTypes.func,
    value: React.PropTypes.any
}

UIAutocomplete.defaultProps = {
    optionFilter: 'name',
    optionValue: 'value',
    optionLabelRender: o => o && o.constructor === Object ? o.name : o,

    suggestionMinimumInputChar: 2,
    suggestionUpdateInterval: 300,
    suggestionMaxCount: 10,

	allowNew: false,
	computeNewValueFromInput: v => v,
	newValueRequiresEnter: false,

    inputClassName: ''
}

export default UIAutocomplete
