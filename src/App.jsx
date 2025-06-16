import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Contagem from "./pages/Contagem";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contagem" element={<Contagem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
