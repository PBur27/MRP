import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './Products'
import Ghp from './Ghp';
import Mrp from './Mrp';
import './main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/ghp' element={<Ghp/>}/>
        <Route path='/mrp' element={<Mrp/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
