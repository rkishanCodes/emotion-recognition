import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Products from "./Components/Products/Products";
import Aibooksuggestion from "./Components/AIBookSuggestion/Aibooksuggestion";
import Footer from "./Components/Footer/Footer";
import CategoryList from "./Components/CategoryList/CategoryList";
import Whychoose from "./Components/WhyChoose/Whychoose";
import BookRecommend from "./Components/BookRecommendation/BookRecommend";
import Ourstore from "./Components/OurStore/Ourstore";

const App = () => {
  const header = useSelector((state) => state.header);

  return (
    <div>
      <Navbar />
      <Hero />
      <Products />
      <Aibooksuggestion />

      {header && <BookRecommend />}

      <Ourstore/>
      <CategoryList />
      <Whychoose />
      <Footer />
    </div>
  );
};

export default App;
