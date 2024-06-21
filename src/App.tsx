
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import CreateAccount from './pages/createAccount'
import Flowers from './pages/flowers'
import Login from './pages/login'
import LatestSightings from './pages/latestSightings'
import Favorites from './pages/favorites'

function App() {

  return (
    <>
    <BrowserRouter>
   <Navbar/>
    <Routes>
      <Route path='/flowers' element={<Flowers/>}/>
      <Route path='/latestSightings' element={<LatestSightings/>}/>
      <Route path='/favorites' element={<Favorites/>}/>
    
    </Routes>

    
   {/* <Login/> */}
   {/* <CreateAccount/> */}
   </BrowserRouter>
    </>
  )
}

export default App
