import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import Regitser from './Components/Register'

function App() {

  return (
    <Router>
      <Routes>
       <Route path='/' element={<LandingPage></LandingPage>}></Route>
       <Route path='/register' element={<Regitser></Regitser>}></Route>
      </Routes>
    </Router>
    
  )
}

export default App
