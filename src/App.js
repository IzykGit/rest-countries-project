
import './App.css';
import Countries from './components/countries';
import Head from './components/head';
import { ThemeProvider } from './ThemeContext';


function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Head />
        <Countries />
      </ThemeProvider>
    </div>
  );
}

export default App;
