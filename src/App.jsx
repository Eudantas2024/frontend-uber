import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Contagem } from "./pages"; // importa das páginas via index.js na pasta pages

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
