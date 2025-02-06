import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import HomePage from './Pages/HomePage'
import ProtectedRoutes from './Routes/ProtectedRoutes'
import { ModalContext } from './Store/Context';
import { useContext } from 'react';

function App() {

  const {loginData} = useContext(ModalContext);
  
  return (
    <Router>
      <Routes>
       <Route path='/' element={<LandingPage></LandingPage>}></Route>
       <Route path='/home' element={<ProtectedRoutes user={loginData} element={<HomePage></HomePage>}></ProtectedRoutes>}></Route>
      </Routes>
    </Router>
    
  )
}

export default App
