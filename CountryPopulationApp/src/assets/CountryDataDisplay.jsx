import React, { useState, useEffect, useCallback } from "react";

function CountryDataDisplay(props){
    // variables
    const [population, setPopulation] = useState([]);
    const [specifiedPopulation, setSpecifiedPopulation] = useState([]);
    var returnHTML;
    var flagInput = "";
    const populationApi = 'https://countriesnow.space/api/v0.1/countries/population/cities';

    // set flagInput variable function with validation
    const setInputFlag = (() => {
        if(props.selectedFlag !== undefined){
            flagInput = <img src={props.selectedFlag.flag}/>
        }
    })()

    // get population data
    useEffect(() => {
      async function getData(){
        const response = await fetch(populationApi);
        const data = await response.json();
        setPopulation(data);
      }
      getData();
    }, []);

    // console.log("population",population.data)
    // console.log(population.data.filter(p => p.country === props.selectedCountry.name))
    
    //set specified population variable accordingly
    useEffect(() => {
        if(population.data !== undefined){
            if (population.data.some(p => p.country === props.selectedCountry.name)) {
                console.log("has")
                const data = population.data.filter(p => p.country === props.selectedCountry.name);
                setSpecifiedPopulation(data);
            }
            else{
                console.log("does not have")
                setSpecifiedPopulation([]);
            }
        }
    }, [props.selectedCountry.name, population.data]);

    //set returnHTML according to result of setSpecifiedPopulation
    if(specifiedPopulation.length > 0 && specifiedPopulation[0] !== undefined){
        // console.log("success", specifiedPopulation)

        const getPopulationCounts = (city) => {
            const populationCounts = specifiedPopulation.filter(p => p.city === city)[0].populationCounts;
            return populationCounts;
        }

        returnHTML = 
            <div className="country-data-display-container">
                <p className="data-title">Population of <span className="title-country">{props.selectedCountry.name} {flagInput}</span> is: </p>
                <div className="data">
                    {specifiedPopulation.map( p => 
                        <><h3 className="city" key={p.city}>{p.city}<br/></h3> 
                        {getPopulationCounts(p.city).map(d => 
                            <p className="population"><span className="data-types">Year:</span> {d.year} <br/> <span className="data-types">Population:</span> {d.value} <br/> <span className="data-types">Data collected on:</span> {d.sex}</p>
                        )} <hr/></>
                    )}
                </div> 
            </div>
    }
    else{
        returnHTML = <p className="data-title">There is no population data on <span className="title-country">{props.selectedCountry.name} {flagInput}</span>. </p>
    }

    return(
        returnHTML
    )
}

export default CountryDataDisplay
