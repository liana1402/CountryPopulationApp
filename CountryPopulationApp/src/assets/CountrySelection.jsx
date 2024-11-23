import React, { useState } from "react";
import CountryDataDisplay from "./CountryDataDisplay";

function CountrySelection(props){
    if (props.countries !== undefined && props.flags !== undefined)
    {
        var [selectedCountry, setSelectedCountry] = useState(props.countries[0]);

        const changeSelection = (e) => {
            setSelectedCountry(props.countries.filter(c => c.name == e.target.value)[0]);
            // console.log(e.target.value)
        }

        return(
            <div className="country-selection-container">
                <label htmlFor="countries">Select a country:</label>
                <select onChange={changeSelection} name="countries" id="countries">
                    {props.countries.map(c => <option value={c.name} key={c.name}>{c.name}</option>)}
                </select>
                <CountryDataDisplay selectedCountry={selectedCountry} selectedFlag={props.flags.filter(f => f.name === selectedCountry.name)[0]}/>
            </div>
        )
    }
}
export default CountrySelection
