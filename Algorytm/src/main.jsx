import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './Products'
import Ghp from './GHP';
import './main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/ghp' element={<Ghp/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
