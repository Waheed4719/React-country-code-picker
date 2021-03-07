"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Countries = require("./Countries.json");

var _Countries2 = _interopRequireDefault(_Countries);

require("./App.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CountryCodeDropdown(props) {
  var _useState = (0, _react.useState)(_Countries2.default),
      _useState2 = _slicedToArray(_useState, 2),
      filteredCountryCode = _useState2[0],
      setFilteredCountryCode = _useState2[1];

  var countryCodeRef = (0, _react.useRef)(null);

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      countryDrop = _useState4[0],
      setCountryDrop = _useState4[1];

  var value = props.value,
      _onChange = props.onChange,
      flag = props.flag,
      dropdownClass = props.dropdownClass,
      fullCompClass = props.fullCompClass;


  function clickOutsideHandler(e) {
    if (countryCodeRef && countryCodeRef.current && !countryCodeRef.current.contains(e.target)) {
      setCountryDrop(false);
    }
  }

  (0, _react.useEffect)(function () {
    window.addEventListener("click", clickOutsideHandler);
    return function () {
      window.removeEventListener("click", clickOutsideHandler);
    };
  }, []);

  return _react2.default.createElement(
    "div",
    {
      className: "countryCodeComponent " + (fullCompClass ? fullCompClass : "") + " " + (value.value ? "" : "empty") + " " + (flag ? "flagged" : ""),
      ref: countryCodeRef
    },
    value.flag && flag && _react2.default.createElement("img", { className: "selectedFlag", src: value.flag }),
    _react2.default.createElement("input", {
      type: "text",
      name: "value",
      placeholder: "Country code",
      value: value.value ? value.value : "",
      autocomplete: "off",
      autoCorrect: "autocomplete_off_hack_xfr4!k",
      className: "cc-input",
      onFocus: function onFocus() {
        return setCountryDrop(true);
      },
      onChange: function onChange(e) {
        if (e.target.value !== "") {
          var _filteredCountryCode = _Countries2.default.filter(function (item, index) {
            var regex = new RegExp(e.target.value, "gi");
            return item.name.match(e.target.value) || item.dialCode.match(e.target.value) || item.isoCode.match(e.target.value);
          });
          setFilteredCountryCode(_filteredCountryCode);
        } else {
          setFilteredCountryCode(_Countries2.default);
        }

        _onChange(_extends({}, value, { flag: "", value: e.target.value }));
      }
    }),
    value.value.length && value.value.match(/^\d+$/) ? _react2.default.createElement(
      "i",
      { className: "plus-icon" },
      "+"
    ) : null,
    _react2.default.createElement("i", { className: "dropdown icon" }),
    countryDrop && _react2.default.createElement(
      "div",
      { className: (dropdownClass ? dropdownClass : "") + " countryDrop" },
      _react2.default.createElement(
        "ul",
        null,
        filteredCountryCode && filteredCountryCode.map(function (item, index) {
          return _react2.default.createElement(
            "li",
            {
              key: index,
              onClick: function onClick(e) {
                e.preventDefault();
                if (item && item.flag && item.dialCode) {
                  _onChange(_extends({}, value, {
                    flag: item.flag,
                    value: item.dialCode.split("+")[1]
                  }));
                  setCountryDrop(false);
                }
              }
            },
            _react2.default.createElement("img", { src: item.flag, height: "16px", width: "24px" }),
            item.name + " (" + item.isoCode + ") " + item.dialCode
          );
        })
      )
    )
  );
}

exports.default = CountryCodeDropdown;