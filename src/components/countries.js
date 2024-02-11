import React from 'react'
import styles from '../styles/components/countries.module.css'
import { useEffect, useState } from 'react'

const Countries = () => {

    const [data, setData] = useState([])
    const [region, setRegion] = useState("")
    const [input, setInput] = useState("")


    useEffect(() => {
        if (input.length === 0 && region === "")  {
            getAllCountries()
        }
        else if (input.length > 0){
            filterByName()
        }
        else if (input.length > 0 && region !== "") {
            filterByRegionAndName()
        }

    }, [input])

    useEffect(() => {
        if(region !== "") {
            filterByRegion()
        }
        else if (region === "") {
            getAllCountries()
        }
    }, [region])


    async function getAllCountries() {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all')
            const result = await response.json();
            setData(result)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }


    async function filterByName() {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${input}`)
            const result = await response.json();
            setData(result.filter(country => {
                if(country.name !== input) {
                    return "This does not equal a country"
                }

                return country
            }))
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    async function filterByRegion() {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/region/${region}`)
            const result = await response.json()
            setData(result)

        } catch (error) {
            console.log(error)
        }
    }

    async function filterByRegionAndName() {
        const response = await fetch(`https://restcountries.com/v3.1/name/${input}`)
        const result = await response.json()
        if(input !== result.name) {
            console.log("Does not equal country")
            return null
        }
        setInput(result.filter(country => country.region === region))
    }

    console.log(region)
    return (
        <div>
            <div className={styles.inputContainer}>
                <input type='text' onChange={(e) => setInput(e.target.value)}/>
                <select id='regionSelection' onChange={(e) => setRegion(e.target.value)} defaultValue={region}>
                    <option value=""></option>
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