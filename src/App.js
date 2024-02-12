
import './App.css';
import Countries from './components/countries';
import { useState } from 'react';


function App() {
  return (
    <div className="App">
          <div className="componentContainer">
            <div className="subContainer">
              <p>Where in the world?</p>
              <button>Dark Mode</button>
            </div>
          </div>
      <Countries />
    </div>
  );
}

export default App;
