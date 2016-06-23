!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports["react-ui-autocomplete"]=t(require("react")):e["react-ui-autocomplete"]=t(e.react)}(this,function(e){return function(e){function t(o){if(n[o])return n[o].exports;var s=n[o]={exports:{},id:o,loaded:!1};return e[o].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var s=n(1),u=o(s);n(7),t["default"]=u["default"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function s(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(8),p=o(l),c=n(3),f=o(c),d=n(2),h=o(d),g=function(e){function t(e){u(this,t);var n=i(this,Object.getPrototypeOf(t).call(this,e));return n.state={displayValue:"",value:e.value,suggestions:[],suggestionFocus:-1,hasFocus:!1},Object.defineProperty(n,"value",{enumerable:!0,get:n.getValue}),e.suggestionUpdateInterval>0&&(n.updateSuggestions=(0,h["default"])(n.updateSuggestions.bind(n),e.suggestionUpdateInterval)),n.handleComponentBlur=n.handleComponentBlur.bind(n),n.handleComponentFocus=n.handleComponentFocus.bind(n),n.handleInputValueChange=n.handleInputValueChange.bind(n),n.handleInputKeyUp=n.handleInputKeyUp.bind(n),n.handleInputKeyDown=n.handleInputKeyDown.bind(n),n}return r(t,e),a(t,[{key:"componentDidMount",value:function(){document.addEventListener("click",this.handleComponentBlur),this.props.value&&this.setState({value:this.props.value},this.resetInputValue),this.updateSuggestions()}},{key:"componentDidUpdate",value:function(e){this.props.value!==e.value&&this.setState({value:this.props.value},this.resetInputValue)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("click",this.handleComponentBlur)}},{key:"handleComponentBlur",value:function(){this.refs.container.contains(event.target)||this.setState({hasFocus:!1},this.resetInputValue)}},{key:"handleComponentFocus",value:function(){this.setState({hasFocus:!0})}},{key:"handleInputValueChange",value:function(e){var t=this,n=e.target.value;this.setState({displayValue:n},function(){t.updateSuggestions(),t.props.allowNew&&!t.props.newValueRequiresEnter&&t.updateValueBasedOnInput()})}},{key:"handleInputKeyDown",value:function(e){return 13===e.keyCode&&-1!==this.state.suggestionFocus?(e.preventDefault(),void this.updateValueBasedOnSuggestion(this.state.suggestions[this.state.suggestionFocus])):13!==e.keyCode||this.props.allowNew||1!==this.state.suggestions.length?13===e.keyCode&&this.props.allowNew?(e.preventDefault(),void this.updateValueBasedOnInput()):40===e.keyCode&&this.state.suggestions.length>0?(e.preventDefault(),this.focusNextSuggestion()):38===e.keyCode&&this.state.suggestions.length>0?(e.preventDefault(),this.focusPreviousSuggestion()):void 0:(e.preventDefault(),void this.updateValueBasedOnSuggestion([].concat(s(this.state.suggestions)).pop()))}},{key:"handleInputKeyUp",value:function(e){27===e.keyCode&&this.resetInputValue()}},{key:"handleSuggestionClick",value:function(e){this.updateValueBasedOnSuggestion(e)}},{key:"handleSuggestionHover",value:function(e,t){this.setState({suggestionFocus:t})}},{key:"focusNextSuggestion",value:function(){var e=this.state.suggestionFocus+1;e<this.state.suggestions.length&&this.setState({suggestionFocus:e})}},{key:"focusPreviousSuggestion",value:function(){var e=this.state.suggestionFocus-1;e>-1&&this.setState({suggestionFocus:e})}},{key:"resetInputValue",value:function(){var e=this;if(!this.props.allowNew){var t=this.props.options.find(function(t){return t[e.props.optionValue]==e.state.value||t===e.state.value});if(!t)return void this.setState({displayValue:"",value:0,suggestions:[]});this.updateValueBasedOnSuggestion(t)}}},{key:"updateValueBasedOnSuggestion",value:function(e){var t=this;this.setState({displayValue:this.props.optionLabelRender(e),value:e.constructor===Object?e[this.props.optionValue]:e,suggestions:[]},function(){t.props.onChange&&t.props.onChange(t.state.value,t.state.displayValue,e)})}},{key:"updateValueBasedOnInput",value:function(){var e=this,t=this.refs.input.value;this.setState({value:this.props.computeNewValueFromInput(t),displayValue:t},function(){e.props.onChange&&e.props.onChange(e.state.value,e.state.displayValue)})}},{key:"updateSuggestions",value:function(){var e=this,t=this.state.displayValue;if(t.trim().length<this.props.suggestionMinimumInputChar)return this.setState({suggestions:[]});var n=this.props.suggestionMaxCount,o=this.props.options.filter(function(o){if(0>=n)return!1;if(o.constructor!==Object){var s=o.toLowerCase().includes(t.toLowerCase());return s&&n--,s}if(Array.isArray(e.props.optionFilter)){var u=e.props.optionFilter.filter(function(e){return(0,f["default"])(e,o)&&(0,f["default"])(e,o).includes?(0,f["default"])(e,o).toLowerCase().includes(t.toLowerCase()):!1}).length>0,i=e.props.optionFilter.reduce(function(e,t){return e=e+" "+(0,f["default"])(t,o)},"").includes(t);return(u||i)&&n--,u||i}var r=(0,f["default"])(e.props.optionFilter,o);if(!r)return!1;var a=r.toLowerCase().includes(t.toLowerCase());return a&&n--,a});this.setState({suggestions:o,suggestionFocus:-1})}},{key:"getValue",value:function(){return this.state.value}},{key:"render",value:function(){var e=this,t=[this.props.className,"ui-autocomplete"].filter(function(e){return!!e}).join(" ");return p["default"].createElement("div",{className:t,ref:"container"},p["default"].createElement("input",{type:"text",ref:"input",className:this.props.inputClassName,value:this.state.displayValue,onFocus:this.handleComponentFocus,onChange:this.handleInputValueChange,onKeyUp:this.handleInputKeyUp,onKeyDown:this.handleInputKeyDown}),this.state.suggestions.length>0&&this.state.hasFocus?p["default"].createElement("div",{className:"ui-autocomplete-suggestions"},this.state.suggestions.map(function(t,n){return p["default"].createElement("a",{href:"javascript:",key:n,className:"ui-autocomplete-suggestion-item "+(n===e.state.suggestionFocus?"suggestion-focus":""),onClick:e.handleSuggestionClick.bind(e,t),onMouseMove:e.handleSuggestionHover.bind(e,t,n)},e.props.optionLabelRender(t))})):null)}}]),t}(l.Component);g.propTypes={options:p["default"].PropTypes.arrayOf(p["default"].PropTypes.oneOfType([p["default"].PropTypes.string,p["default"].PropTypes.object])).isRequired,optionFilter:p["default"].PropTypes.oneOfType([p["default"].PropTypes.string,p["default"].PropTypes.arrayOf(p["default"].PropTypes.string)]),optionValue:p["default"].PropTypes.string,optionLabelRender:p["default"].PropTypes.func,suggestionMinimumInputChar:p["default"].PropTypes.number,suggestionUpdateInterval:p["default"].PropTypes.number,suggestionMaxCount:p["default"].PropTypes.number,inputClassName:p["default"].PropTypes.string,allowNew:p["default"].PropTypes.bool,computeNewValueFromInput:p["default"].PropTypes.func,newValueRequiresEnter:p["default"].PropTypes.bool,onChange:p["default"].PropTypes.func,value:p["default"].PropTypes.any},g.defaultProps={optionFilter:"name",optionValue:"value",optionLabelRender:function(e){return e&&e.constructor===Object?e.name:e},suggestionMinimumInputChar:2,suggestionUpdateInterval:300,suggestionMaxCount:10,allowNew:!1,computeNewValueFromInput:function(e){return e},newValueRequiresEnter:!1,inputClassName:""},t["default"]=g},function(e,t){"use strict";function n(e,t,n){var o;return function(){var s=this,u=arguments,i=function(){o=null,n||e.apply(s,u)},r=n&&!o;clearTimeout(o),o=setTimeout(i,t),r&&e.apply(s,u)}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=n},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t){return e.split(".").reduce(function(e,t){return e&&e[t]?e[t]:null},t)};t["default"]=n},function(e,t,n){t=e.exports=n(5)(),t.push([e.id,".ui-autocomplete *{box-sizing:border-box}.ui-autocomplete{position:relative}.ui-autocomplete .ui-autocomplete-suggestions{position:absolute;z-index:100;left:0;width:100%;border:1px solid #999;background:hsla(0,0%,100%,.9)}.ui-autocomplete .ui-autocomplete-suggestions .ui-autocomplete-suggestion-item{display:block;outline:0;width:100%;padding:10px;color:#333;text-decoration:none}.ui-autocomplete .ui-autocomplete-suggestions .ui-autocomplete-suggestion-item.suggestion-focus{color:#fff;background-color:#333}",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},s=0;s<this.length;s++){var u=this[s][0];"number"==typeof u&&(o[u]=!0)}for(s=0;s<t.length;s++){var i=t[s];"number"==typeof i[0]&&o[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),e.push(i))}},e}},function(e,t,n){function o(e,t){for(var n=0;n<e.length;n++){var o=e[n],s=d[o.id];if(s){s.refs++;for(var u=0;u<s.parts.length;u++)s.parts[u](o.parts[u]);for(;u<o.parts.length;u++)s.parts.push(l(o.parts[u],t))}else{for(var i=[],u=0;u<o.parts.length;u++)i.push(l(o.parts[u],t));d[o.id]={id:o.id,refs:1,parts:i}}}}function s(e){for(var t=[],n={},o=0;o<e.length;o++){var s=e[o],u=s[0],i=s[1],r=s[2],a=s[3],l={css:i,media:r,sourceMap:a};n[u]?n[u].parts.push(l):t.push(n[u]={id:u,parts:[l]})}return t}function u(e,t){var n=v(),o=b[b.length-1];if("top"===e.insertAt)o?o.nextSibling?n.insertBefore(t,o.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),b.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function i(e){e.parentNode.removeChild(e);var t=b.indexOf(e);t>=0&&b.splice(t,1)}function r(e){var t=document.createElement("style");return t.type="text/css",u(e,t),t}function a(e){var t=document.createElement("link");return t.rel="stylesheet",u(e,t),t}function l(e,t){var n,o,s;if(t.singleton){var u=m++;n=y||(y=r(t)),o=p.bind(null,n,u,!1),s=p.bind(null,n,u,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=a(t),o=f.bind(null,n),s=function(){i(n),n.href&&URL.revokeObjectURL(n.href)}):(n=r(t),o=c.bind(null,n),s=function(){i(n)});return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else s()}}function p(e,t,n,o){var s=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=C(t,s);else{var u=document.createTextNode(s),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(u,i[t]):e.appendChild(u)}}function c(e,t){var n=t.css,o=t.media;if(o&&e.setAttribute("media",o),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function f(e,t){var n=t.css,o=t.sourceMap;o&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var s=new Blob([n],{type:"text/css"}),u=e.href;e.href=URL.createObjectURL(s),u&&URL.revokeObjectURL(u)}var d={},h=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},g=h(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),v=h(function(){return document.head||document.getElementsByTagName("head")[0]}),y=null,m=0,b=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=g()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=s(e);return o(n,t),function(e){for(var u=[],i=0;i<n.length;i++){var r=n[i],a=d[r.id];a.refs--,u.push(a)}if(e){var l=s(e);o(l,t)}for(var i=0;i<u.length;i++){var a=u[i];if(0===a.refs){for(var p=0;p<a.parts.length;p++)a.parts[p]();delete d[a.id]}}}};var C=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t,n){var o=n(4);"string"==typeof o&&(o=[[e.id,o,""]]);n(6)(o,{});o.locals&&(e.exports=o.locals)},function(t,n){t.exports=e}])});