import './App.css'
import './index.css' 
import { Dashboard } from './pages/Dashboard'
import { LogIn } from './pages/LogInPage'
import { Signup } from './pages/SignupPage'
import { BrowserRouter , Routes, Route } from 'react-router-dom'


function App() {
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup/>} />
      <Route path='/signin' element={<LogIn/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
  </BrowserRouter>
  
}

export default App
