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

    const componentTheme = {
        backgroundColor: darkTheme ? "#383838" : "white",
        color: darkTheme ? "white" : "#383838",
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
            <p key={currencyCode}><span style={{fontWeight: "bold"}}>Currencies:</span> {name}</p>
        ));
    }


    let languageDetails;
    if (country.languages) {
        const languagesList = Object.values(country.languages).join(', ');
        languageDetails = <p><span style={{fontWeight: "bold"}}>Languages:</span> {languagesList}</p>;
    }

    let nativeName;
    if (country.name.nativeName) {
        const firstNativeNameEntry = Object.entries(country.name.nativeName)[0];
        const [nameCode, {official}] = firstNativeNameEntry;
        nativeName = <p key={nameCode}><span style={{fontWeight: "bold"}}>Native Name:</span> {official}</p>;
    }


    const navigate = useNavigate();

    const passCountryParams = (country) => {
    navigate('/countrydetails', { state: { ...country } });
    }

    function homePage() {
        navigate('/')
    }

    return (
        <>
        <Head className={styles.head}/>
        <div className={styles.page} style={themeStyles}>
            <div className={styles.componentContainer} style={componentTheme}>

                    <button className={styles.homeButton} onClick={() => homePage()} style={themeStyles}>Back</button>

                    <div className={styles.countryFlagContainer}>
                        <img src={country.flags.png} alt={country.flags.alt} className={styles.countryFlag}  style={themeStyles}/>
                    </div>



 


                    <div className={styles.infoContainer}>
                        <h1 className={styles.countryName}>{country.name.common}</h1>
                        <div key={country.name.common} className={styles.info1}>
                            {nativeName}
                            <p><span style={{fontWeight: "bold"}}>Population:</span> {country.population}</p>
                            <p><span style={{fontWeight: "bold"}}>Region:</span> {country.region}</p>
                            <p><span style={{fontWeight: "bold"}}>Sub Region:</span> {country.subregion}</p>
                            <p><span style={{fontWeight: "bold"}}>Capital:</span> {country.capital}</p>

                        </div>
                        <div className={styles.info2}>
                            <p><span style={{fontWeight: "bold"}}>Top Level Domain:</span> {country.tld}</p>
                            {currencyDetails}
                            {languageDetails}
                        </div>
                        <div className={styles.borderCountriesContainer}  style={componentTheme}>
                            <p style={{fontWeight: "bold"}}>Bordering Countries:</p>
                            {borderCountries.map(country => {
                            return (
                                <div key={country.name.common} onClick={() => passCountryParams(country)} className={styles.borderCountryCard}>
                                    <p style={themeStyles}>{country.name.common}</p>
                                </div>
                            )
                            })}      
                        </div>
                    </div>


                        

            </div>

        </div>
    </>
  )
}
