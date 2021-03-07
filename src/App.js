import "./App.css";
import { useRef, useState } from "react";
import CountryCodeDropdown from "./CountryCode/CountryCodePicker";

function App(props) {

  const [countryCode, setCountryCode] = useState({ value: "" });

  const changeCountryCode = (value) => {
    console.log(value);
    setCountryCode(value);
  };

  const {value, onChange, flag, dropdownClass, fullCompClass} = props

  return (
      <CountryCodeDropdown
        value={value? value: countryCode}
        onChange={onChange? onChange: changeCountryCode}
        flag={false}
        dropdownClass={dropdownClass}
        fullCompClass={fullCompClass}
      />
    
  );
}

export default App;
