import React, { useState } from "react"
import './SearchBar.css'

import 'bootstrap/dist/css/bootstrap.min.css'

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from "@mui/icons-material/Close";

import { Card, Button, Alert, Container, InputGroup, FormControl } from "react-bootstrap"
import Box from '@mui/material/Box';

function SearchBar( props ) {

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
  
    const handleFilter = (event) => {
      const searchWord = event.target.value;
      setWordEntered(searchWord);
      const newFilter = props.data.filter((value) => {
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
              placeholder={props.placeholder}
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
            {/* <InputGroup>
              <FormControl placeholder="Enter Stock Symbol (e.g. MSFT)" value={wordEntered} onChange={handleFilter}/>
            </InputGroup> */}
            
          </div>
          {filteredData.length != 0 && (
            <div className="dataResult">
              {filteredData.slice(0, 15).map((value, key) => {
                return (
                  <button className="dataItem" onClick={() => props.searching(value.Symbol)} >
                    <p>{value.Symbol}: {value.Name}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
    );
}


export default SearchBar