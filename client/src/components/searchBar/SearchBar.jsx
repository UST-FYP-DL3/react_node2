import React, { useState } from "react"
import './SearchBar.css'

import 'bootstrap/dist/css/bootstrap.min.css'

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from "@mui/icons-material/Close";

import { Card, Button, Alert, Container } from "react-bootstrap"
import Box from '@mui/material/Box';

function SearchBar( {placeholder, data} ) {

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
  
    const handleFilter = (event) => {
      const searchWord = event.target.value;
      setWordEntered(searchWord);
      const newFilter = data.filter((value) => {
        return value.Name.toLowerCase().includes(searchWord.toLowerCase()) || value.Symbol.toLowerCase().includes(searchWord.toLowerCase());
      });
  
      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    };
  
    const clearInput = () => {
      setFilteredData([]);
      setWordEntered("");
    };

    return (
        <div className="search">
          <div className="searchInputs">
            <input
              type="text"
              placeholder={placeholder}
              value={wordEntered}
              onChange={handleFilter}
            />
            <div className="searchIcon">
              {filteredData.length === 0 ? (
                <SearchIcon />
              ) : (
                <CloseIcon id="clearBtn" onClick={clearInput} />
              )}
            </div>
          </div>
          {filteredData.length != 0 && (
            <div className="dataResult">
              {filteredData.slice(0, 15).map((value, key) => {
                return (
                  <a className="dataItem" href={'/'} target="_blank">
                    <p>{value.Symbol}: {value.Name}</p>
                  </a>
                );
              })}
            </div>
          )}
        </div>
    );
}


export default SearchBar