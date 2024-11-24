import { createContext, useEffect, useState } from 'react'
import './App.css'
import CountrySelection from './assets/CountrySelection'

function App() {
  // variables
  const [countries, setCountries] = useState([]);
  const [flags, setFlags] = useState([]);
  const countriesApi = 'https://countriesnow.space/api/v0.1/countries/capital';
  const flagsApi = 'https://countriesnow.space/api/v0.1/countries/flag/images';

  // get countries data
  useEffect(() => {
    async function getData(){
      const response = await fetch(countriesApi);
      const data = await response.json();
      setCountries(data);
    }
    getData();
  }, []);

  // get flags data
  useEffect(() => {
    async function getData(){
      const response = await fetch(flagsApi);
      const data = await response.json();
      setFlags(data);
    }
    getData();
  }, []);

  return (
      <CountrySelection countries={countries.data} flags={flags.data}/>
  )
}

export default App
