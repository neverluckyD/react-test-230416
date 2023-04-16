import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  selectHistory,
  getWeatherAgainAsync,
  removeHistory,
} from "../store/weatherSlice.js";

function SearchHistory() {
  const dispatch = useDispatch();
  const history = useSelector(selectHistory);
  return (
    <>
      <h2 className="is-size-4 has-text-weight-bold section-title">
        Search History
      </h2>
      {history && history.length ? (
        <ol className="search-list" style={{ listStyleType: "decimal" }}>
          {history.map((data, index) => (
            <li className="search-item is-flex is-align-content-center" key={index}>
              <div className="is-flex-grow-1">
                <span>
                  {index + 1}. {data.city}, {data.country.value}
                </span>
              </div>
              <div className="is-flex is-align-content-center">
                <span>
                  {moment(new Date(data.dt * 1000)).format("hh:mm:ss A")}
                </span>
                <button
                  className="button is-small is-rounded is-primary pl-3 pr-3 ml-2"
                  onClick={() => dispatch(getWeatherAgainAsync(data))}
                >
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </span>
                </button>
                <button
                  className="button is-small is-rounded is-danger pl-3 pr-3 ml-2"
                  onClick={() => dispatch(removeHistory(data))}
                >
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="columns is-centered mt-4">No Record</div>
      )}
    </>
  );
}

export default SearchHistory;
