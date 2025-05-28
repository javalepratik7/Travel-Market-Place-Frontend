import './App.css'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Home from './Components/Home';
import Signin from './Components/Signin';
import Login from './Components/Login';
import Tours from './Components/Tours';
import TourInfo from './Components/TourInfo';
import AgentTour from './Components/AgentTour';
import AgentHistory from './Components/AgentHistory';
import AppliedTours from './Components/AppliedTours';
import Profile from './Components/Profile';
import TravelerHistory from './Components/TravelerHistory';
import SendOTP from './Components/SendOtp';
import ForgetPassword from './Components/ForgetPassword';
// import Demo from './Components/Demo';

  
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/tours' element={<Tours />} />
          <Route path='/toursInfo' element={<TourInfo />} />
          <Route path='/travelerHistory' element={<TravelerHistory />} />

          <Route path='/login' element={<Login />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/sendotp' element={<SendOTP />} />
          <Route path='/forgetPassword' element={<ForgetPassword />} />

          <Route path='/agentTour' element={<AgentTour />} />
          <Route path='/agentHistory' element={<AgentHistory />} />
          <Route path='/appliedTours' element={<AppliedTours />} />

          <Route path='/profile' element={<Profile />} />
          {/* <Route path='demo' element={<Demo/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
