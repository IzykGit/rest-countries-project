
import './App.css';
import { ThemeProvider } from './ThemeContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import CountryDetails from './CountryDetails';



function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<ThemeProvider> <HomePage /> </ThemeProvider>}/>
            <Route path='/countrydetails' element={<ThemeProvider> <CountryDetails /> </ThemeProvider>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
