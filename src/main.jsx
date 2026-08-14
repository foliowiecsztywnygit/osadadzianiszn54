import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const container = document.getElementById('root')
const rootContent = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

if (container.hasChildNodes()) {
  hydrateRoot(container, rootContent)
} else {
  createRoot(container).render(rootContent)
}
