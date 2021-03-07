import React, { useState, useEffect, useRef } from "react";
import Countries from "./Countries.json";
import './countryCodePicker.css'

function CountryCodeDropdown(props) {
  const [filteredCountryCode, setFilteredCountryCode] = useState(Countries);
  const countryCodeRef = useRef(null);
  const [countryDrop, setCountryDrop] = useState(false);

  const { value, onChange, flag, dropdownClass, fullCompClass } = props;

  function clickOutsideHandler(e) {
    if (
      countryCodeRef &&
      countryCodeRef.current &&
      !countryCodeRef.current.contains(e.target)
    ) {
      setCountryDrop(false);
    }
  }

  useEffect(() => {
    window.addEventListener("click", clickOutsideHandler);
    return () => {
      window.removeEventListener("click", clickOutsideHandler);
    };
  }, []);

  return (
    <div
      className={`countryCodeComponent ${fullCompClass? fullCompClass:""} ${value.value ? "" : "empty"} ${
        flag ? "flagged" : ""
      }`}
      ref={countryCodeRef}
    >
      {value.flag && flag && <img className="selectedFlag" src={value.flag} />}

      <input
        type="text"
        name="value"
        placeholder="Country code"
        value={value.value ? value.value : ""}
        autocomplete="off"
        autoCorrect="autocomplete_off_hack_xfr4!k"
        className="cc-input"
        onFocus={() => setCountryDrop(true)}
        onChange={(e) => {
          if (e.target.value !== "") {
            let filteredCountryCode = Countries.filter((item, index) => {
              const regex = new RegExp(e.target.value, "gi");
              return (
                item.name.match(e.target.value) ||
                item.dialCode.match(e.target.value) ||
                item.isoCode.match(e.target.value)
              );
            });
            setFilteredCountryCode(filteredCountryCode);
          } else {
            setFilteredCountryCode(Countries);
          }

          onChange({ ...value, flag: "", value: e.target.value });
        }}
      />
      {value.value.length && value.value.match(/^\d+$/) ? (
        <i className="plus-icon">&#43;</i>
      ) : null}
      <i className="dropdown icon"></i>
      {countryDrop && (
        <div className={`${dropdownClass ? dropdownClass : ""} countryDrop`}>
          <ul>
            {filteredCountryCode &&
              filteredCountryCode.map((item, index) => (
                <li
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item && item.flag && item.dialCode) {
                      onChange({
                        ...value,
                        flag: item.flag,
                        value: item.dialCode.split("+")[1],
                      });
                      setCountryDrop(false);
                    }
                  }}
                >
                  <img src={item.flag} height="16px" width="24px" />
                  {item.name + " (" + item.isoCode + ") " + item.dialCode}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CountryCodeDropdown;
