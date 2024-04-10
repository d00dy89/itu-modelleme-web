import logo from './logo.svg';
import Home from './pages/Home';
import Forecast from './pages/Forecast';
import Analysis from './pages/Analysis';
import Papers from './pages/Papers';
import Navbar from './components/Navbar';
import './pages/pages.css';
import './components/components.css';

function App() {

  return (
    <>
      <Navbar />

      {/* TODO: Use Switch and Link of react-router */}
      <Home />
      <Forecast />
      <Analysis />
      <Papers />
    </>
  );
}

export default App;
