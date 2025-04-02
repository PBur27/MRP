import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './Products'
import './main.css'
import Algorytm from './Algorytm';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/algorytm' element={<Algorytm/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
