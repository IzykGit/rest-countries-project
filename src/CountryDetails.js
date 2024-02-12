import React, { useEffect, useState } from 'react'
import Head from './components/head'
import styles from './styles/CountryDetails.module.css'
import { useNavigate, useLocation } from 'react-router-dom';



export default function CountryDetails() {

    const [data, setData] = useState({})

    const location = useLocation();
    const countryName = location.state;
    console.log(countryName.common)


    useEffect(() => {
        async function searchCountry() {
            const response = await fetch(`https://restcountries.com/v3.1/name/${countryName.common}`)
            const result = await response.json()
            setData(result)
            console.log(result)
        }

        if (countryName.common) {
            searchCountry()
        }
    }, [countryName.common])
    

    const navigate = useNavigate()

    function homePage() {
        navigate('/')
    }



    return (
        <div>
            <Head />

            <button onClick={() => homePage()}>Back</button>

            <div className={styles.infoContainer}>
                {data.length > 0 && data.map(country => {
                        let currencyDetails;
                        if (country.currencies) {
                        currencyDetails = Object.entries(country.currencies).map(([currencyCode, { name }]) => (
                            <p key={currencyCode}>Currencies: {name}</p>
                        ));
                        }
                    

                        let languageDetails;
                        if (country.languages) {
                        languageDetails = Object.entries(country.languages).map(([languageCode, languageName]) => (
                            <p key={languageCode}>Languages: {languageName}</p>
                        ));
                        }

                        let nativeName;
                        if (country.name.nativeName) {
                            const firstNativeNameEntry = Object.entries(country.name.nativeName)[0];
                            const [nameCode, {official}] = firstNativeNameEntry;
                            nativeName = <p key={nameCode}>Native Name: {official}</p>;
                        }
                    return (
                        <div key={country.name.common}>
                            <img src={country.flags.png} alt={country.flags.alt}/>
                            <h1>{country.name.common}</h1>
                            {nativeName}
                            <p>Population: {country.population}</p>
                            <p>Region: {country.region}</p>
                            <p>Sub Region: {country.subregion}</p>
                            <p>Capital: {country.capital}</p>

                            <div>
                                <p>Top Level Domain: {country.tld}</p>
                                {currencyDetails}
                                {languageDetails}
                            </div>

                            <div>
                                
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
  )
}
