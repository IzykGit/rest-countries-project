import React, { useEffect, useState } from 'react'
import Head from './components/head'
import styles from './styles/CountryDetails.module.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme, useThemeUpdate } from './ThemeContext';



export default function CountryDetails() {



    const darkTheme = useTheme()

    const themeStyles = {
      backgroundColor: darkTheme ? "#383838" : "white",
      color: darkTheme ? "white" : "#383838",
      boxShadow: darkTheme ? "0px 4px 8px #282828" : "0px 4px 10px lightgrey",
  
    }

    const location = useLocation();
    const country = location.state;
    console.log(country)

    const [borderCountries, setBorderCountries] = useState([])

    useEffect(() => {
        async function fetchBorderCountries(borders) {
          const responses = await Promise.all(
            borders.map(borderCode =>
              fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`).then(response => response.json())
            )
          );
      

          const borderCountries = responses.map(response => response[0]);
          console.log(borderCountries)

          if (country.borders) {
            setBorderCountries(borderCountries)
          }
        }
      

        if(country.borders) {  
            fetchBorderCountries(country.borders);
        }
      }, [country.borders]);



    let currencyDetails;
        if (country.currencies) {
        currencyDetails = Object.entries(country.currencies).map(([currencyCode, {name}]) => (
            <p key={currencyCode}>Currencies: {name}</p>
        ));
    }


    let languageDetails;
    if (country.languages) {
        const languagesList = Object.values(country.languages).join(', ');
        languageDetails = <p>Languages: {languagesList}</p>;
    }

    let nativeName;
    if (country.name.nativeName) {
        const firstNativeNameEntry = Object.entries(country.name.nativeName)[0];
        const [nameCode, {official}] = firstNativeNameEntry;
        nativeName = <p key={nameCode}>Native Name: {official}</p>;
    }


    const navigate = useNavigate();

    const passCountryParams = (country) => {
    navigate('/countrydetails', { state: { ...country } });
    }

    function homePage() {
        navigate('/')
    }

    return (
        <div style={{height: "100vh", overflow: "hidden"}}>
        <Head />
        <div className={styles.pageContainer} style={themeStyles}>



            <div className={styles.mainContainer}>
 
                <div className={styles.subContainer}>
                    
                            <div className={styles.buttonContainer}>
                                <button onClick={() => homePage()} style={themeStyles}>Back</button>
                            </div>
                            <div className={styles.countryFlagContainer}>
                                <img src={country.flags.png} alt={country.flags.alt} className={styles.countryFlag}  style={themeStyles}/>
                            </div>


 
                    <div className={styles.infoContainerGrid}>
                            <div className={styles.infoGrid1}>
                                <h1 className={styles.countryName}>{country.name.common}</h1>
                            </div>

                            <div key={country.name.common} className={styles.infoGrid2}>
                                {nativeName}
                                <p>Population: {country.population}</p>
                                <p>Region: {country.region}</p>
                                <p>Sub Region: {country.subregion}</p>
                                <p>Capital: {country.capital}</p>

                            </div>
                            <div className={styles.infoGrid3}>
                                <p>Top Level Domain: {country.tld}</p>
                                {currencyDetails}
                                {languageDetails}
                            </div>
                        </div>

                        
                    <div className={styles.borderCountriesContainer}>
                            <p>Bordering Countries:</p>
                            {borderCountries.map(country => {
                            return (
                                <div className={styles.borderCountriesCard} key={country.name.common} onClick={() => passCountryParams(country)}>
                                    <p style={themeStyles}>{country.name.common}</p>
                                </div>
                            )
                         })}      
                    </div>

                    </div>

                </div>




            </div>
        </div>
  )
}
