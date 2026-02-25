import { StrictMode, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

function Root(){
  const [mode,setMode] = useState('light')

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),[mode]
  )
  return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <App mode={mode} setMode={setMode} />
      </AuthProvider>
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
