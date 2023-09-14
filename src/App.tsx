import React, { useEffect, useState } from "react";
import "./App.css";
import Products from "./component/products/Products";
import Search from "./component/Search";

const App: React.FC = () => {
  return (
    <div className="App ">
      <div className="container">
        <Search />
        <Products />
      </div>
    </div>
  );
};

export default App;
