import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import countries from "../configs/countries.json";
import {
  setCity,
  setCountry,
	selectCity,
	selectCountry,
	getWeatherAsync,
	clearInput
} from '../store/weatherSlice.js'

function SearchBar() {
	const dispatch = useDispatch();
	const city = useSelector(selectCity);
	const country = useSelector(selectCountry);
  return (
    <div className="field is-horizontal">
      <div className="field-body">
        <div className="field is-narrow">
          <label className="label pt-2">City</label>
        </div>
        <div className="field">
          <div className="control is-expanded">
            <input className="input" type="text" value={city} onChange={(e) => dispatch(setCity(e.target.value))}/>
          </div>
        </div>
        <div className="field is-narrow">
          <label className="label pt-2">Country</label>
        </div>
        <div className="field">
          <div className="control is-expanded">
            <Select options={countries} value={country} isSearchable onChange={(e) => dispatch(setCountry(e))}/>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-primary" onClick={() => dispatch(getWeatherAsync({city, country}))}>Search</button>
          </div>
          <div className="control">
            <button className="button is-light" onClick={() => dispatch(clearInput())}>Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
