import React from 'react'
import styles from '../styles/components/head.module.css'
import { useTheme, useThemeUpdate } from '../ThemeContext'

const Head = () => {
  const darkTheme = useTheme()
  const toggleTheme = useThemeUpdate()

  const themeStyles = {
    backgroundColor: darkTheme ? "#0C0C0C" : "white",
    color: darkTheme ? "white" : "#0C0C0C",
    boxShadow: darkTheme ? "0px 4px 8px #282828" : "0px 4px 10px lightgrey",
  }

  const buttonStyle = {
    backgroundColor: darkTheme ? "#0C0C0C" : "white",
    color: darkTheme ? "white" : "#0C0C0C",
  }

  return (
    <div className={styles.componentContainer} style={themeStyles}>
        <div className={styles.subContainer}>
            <p>Where in the world?</p>
            <button onClick={toggleTheme} style={buttonStyle}>Dark Mode</button>
        </div>

    </div>
  )
}

export default Head