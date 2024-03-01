import React from 'react'

import IntroSection from './components/intro/Intro'
import ContactSection from './components/contact-section/ContactSection'
import MapSection from './components/map/Map' // import the map here
import DisclaimerSection from './components/disclaimer/Disclaimer'
import FooterSection from './components/footer/Footer'

import './App.css'

const location = {
  address: '2 Place Armand Carrel, 75019 Paris, France',
  lat: 48.882695,
  lng: 2.3828027,
} 

const App = () => (
  <div className="App">
    <IntroSection />
    <ContactSection />
    <MapSection location={location} zoomLevel={17} />
    <DisclaimerSection />
    <FooterSection />
  </div>
)

export default App