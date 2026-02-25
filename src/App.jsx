import { BrowserRouter, Routes,Route } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'

function App({mode, setMode}) {
  return (
    
    <BrowserRouter>
     
      <Routes>
        <Route path='/'
         element={<Login mode={mode} setMode={setMode} />} />
        <Route path="/register" element={<Register />}/>

        <Route
        path="/dashboard"
        element={<PrivateRoute><Dashboard /> </PrivateRoute>}
        />

      </Routes>
    </BrowserRouter>
  )

}

export default App
