import React from 'react';
import './App.css';
import Header from './Header';
import Slider from './Slider';
import MainCard from './MainCard';
import Menu from './Menu';
import OfferRow from './OfferRow';

function App() {
  return (
    <div className="App">
      <Header/>
      <Menu/>
      <Slider/>
      <MainCard/>
      <OfferRow/>
    </div>
  );
}

export default App;
