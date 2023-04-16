import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectResult, selectError } from "../store/weatherSlice.js";

function SearchBar() {
  const result = useSelector(selectResult);
  const error = useSelector(selectError);
  return error ? (
    <div class="notification is-danger mt-2">{error}</div>
  ) : result ? (
    <div className="box">
      <p>
        {result.city}, {result.country.value}
      </p>
      <h1 className="is-size-2 has-text-weight-bold">{result.weather.main}</h1>
      <table className="temperature-table">
        <tr>
          <td>Description:</td>
          <td>{result.weather.description}</td>
        </tr>
        <tr>
          <td>Temperature:</td>
          <td>
            {result.dew_point.toFixed(2)}&#8451; ~{" "}
            {result.feels_like.toFixed(2)}&#8451;
          </td>
        </tr>
        <tr>
          <td>Humidity:</td>
          <td>{result.humidity}%</td>
        </tr>
        <tr>
          <td>Time:</td>
          <td>
            {moment(new Date(result.dt * 1000)).format("YYYY-MM-DD hh:mm:ss A")}
          </td>
        </tr>
      </table>
    </div>
  ) : (
    <></>
  );
}

export default SearchBar;
