import React from 'react'
import Header from './components/Header'
import './App.css'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'

const App = () => {
  return (
    <ThemeProvider >
      <Header />
      <Outlet />
    </ThemeProvider>
  )
}

export default App
