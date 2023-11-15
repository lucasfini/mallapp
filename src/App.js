import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import SearchPage from "./components/searchPage.js";
import ProductsPage from "./components/productsPage.js";
import ProductDetailsPage from "./components/productDetailsPage.js";
import Footer from "./components/footer.js";
import "./App.css";
import './fonts.css';

function App() {
  return (
    <div className="app">
      <div className="h-100">
     <Routes>
      <Route path="/" element={<SearchPage /> }/>
      <Route path='/productPage' element={<ProductsPage/> }/>
     </Routes>
     </div>
     <div className="footer-container">
      <Footer/>
      </div>
    </div>
  );
}

export default App;
