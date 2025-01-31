import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import Products from './Components/Products/Products'
import Aibooksuggestion from './Components/AIBookSuggestion/Aibooksuggestion'
import Footer from './Components/Footer/Footer'
import CategoryList from './Components/CategoryList/CategoryList'
import Whychoose from './Components/WhyChoose/Whychoose'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Products/>
      <Aibooksuggestion/>
      <Products/>
      <CategoryList/>
      <Whychoose/>
      <Footer/>
    </div>
  )
}

export default App
