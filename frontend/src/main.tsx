import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import HeaderNavBar from './components/header-nav-bar/HeaderNavBar.tsx'

createRoot(document.getElementById('root')!).render(
 
    <App />
   
)
