import React from 'react'
import styles from '../styles/components/countries.module.css'
import { useEffect, useState } from 'react'

const Countries = () => {

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

                setData(result)

            } catch(error) {
                console.log(error, "error")
            }
        }

        fetchCountries()

    }, [input, region])


    



    return (
        <div className={styles.componentContainer}>
            <div className={styles.inputContainer}>
                <input placeholder="Search Country" id='countryInput' type='text' onChange={(e) => setInput(e.target.value)}/>
                <select className={styles.selectRegion} id='regionSelection' onChange={(e) => {

                    setRegion(e.target.value)
                    setInput("")
                    document.getElementById('countryInput').value = ""
                    
                    }} defaultValue={region}>

                        
                    <option value="">Select By Region</option>
                    <option value="Americas">Americas</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">Africa</option>
                    <option value="Antarctic">Antarctic</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
            <div className={styles.countryCardContainer}>
                {data.map(country => {
                    return (
                        <div key={country.name.common} className={styles.countryCard}>
                            <div className={styles.countryFlag}>
                                <img src={country.flags.png} alt={country.flags.alt}/>
                            </div>
                            <div className={styles.countryInfo}>
                                <p>{country.name.common}</p>
                            </div>

                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Countries