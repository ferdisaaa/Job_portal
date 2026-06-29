import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { JobProvider } from './context/JobContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <JobProvider>
        <App />
      </JobProvider>
    </BrowserRouter>
  </StrictMode>,
)
