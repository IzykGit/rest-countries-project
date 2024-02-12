import React from 'react'
import Head from './components/head'
import styles from './styles/components/countries.module.css'
import { useEffect, useState } from 'react'
import { useTheme, useThemeUpdate } from './ThemeContext'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

  const [data, setData] = useState([])
  const [region, setRegion] = useState("")
  const [input, setInput] = useState("")


  useEffect(() => {
      async function fetchCountries() {
          let url = 'https://restcountries.com/v3.1/all'

          if(input) {
              url = `https://restcountries.com/v3.1/name/${input}`
          }
          else if (region) {
              url = `https://restcountries.com/v3.1/region/${region}`
          }

          try {
              const response = await fetch(url) 
              let result = await response.json();

              


              if(input && region) {
                  result = result.filter(country => country.region.includes(region))
                  setData(result)
    
              }

              if(input) {
                  result = result.filter(country => country.name)
                  setData(result)
    
              }

              console.log(result)
              setData(result)


          } catch(error) {
              console.log(error, "error")
          }
      }

      fetchCountries()

  }, [input, region])


  const darkTheme = useTheme()

  const themeStyles = {
    backgroundColor: darkTheme ? "#383838" : "white",
    color: darkTheme ? "white" : "#383838",
    boxShadow: darkTheme ? "0px 4px 8px #282828" : "0px 4px 10px lightgrey",

  }

  const navigate = useNavigate();

  const passCountryParams = (country) => {
    navigate('/countrydetails', { state: { ...country } });
  }



  return (
    <>
      <Head />
      <div className={styles.componentContainer} style={themeStyles}>


          <div className={styles.inputContainer}>
              <div className={styles.inputSubContainer}>
                  <input placeholder="Search Country" id='countryInput' type='text' onChange={(e) => setInput(e.target.value)} style={themeStyles}/>
                  <select className={styles.selectRegion} id='regionSelection' onChange={(e) => {

                      setRegion(e.target.value)
                      setInput("")
                      document.getElementById('countryInput').value = ""
                      
                      }} defaultValue={region} style={themeStyles}>

                          
                      <option value="">Select By Region</option>
                      <option value="Americas">Americas</option>
                      <option value="Europe">Europe</option>
                      <option value="Asia">Asia</option>
                      <option value="Africa">Africa</option>
                      <option value="Antarctic">Antarctic</option>
                      <option value="Oceania">Oceania</option>
                  </select>
              </div>
          </div>

          <div className={styles.countryCardContainer}>
              {data.map(country => {

                  return (
                          <div key={country.common} className={styles.countryCard} style={themeStyles} onClick={() => passCountryParams(country.name)}>
                              <div className={styles.countryFlag}>
                                  <img src={country.flags.png} alt={country.flags.alt}/>
                              </div>
                              <div className={styles.countryInfo}>
                                  <p className={styles.countryName}>{country.name.common}:</p>
                                  <p>Population: {country.population}</p>
                                  <p>Region: {country.region}</p>
                                  <p>Capital: {country.capital}</p>
                              </div>

                          </div>
                  )
              })}
          </div>

      </div>
    </>
  )
}

export default HomePage