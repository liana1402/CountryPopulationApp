import { createContext, useEffect, useState } from 'react'
import './App.css'
import CountrySelection from './assets/CountrySelection'

function App() {
  const [countries, setCountries] = useState([]);
  const countriesApi = 'https://countriesnow.space/api/v0.1/countries/capital';

  useEffect(() => {
    async function getData(){
      const response = await fetch(countriesApi);
      const data = await response.json();
      setCountries(data);
    }
    getData();
  }, []);

  return (
    <>
      <CountrySelection countries={countries.data}/>
    </>
  )
}

export default App
