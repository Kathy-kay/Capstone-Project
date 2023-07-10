
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Feeds from "./Pages/Feeds";
import CreatePost from "./Pages/CreatePost";
import LoginPage from "./Pages/auth/LoginPage";
import SignUp from "./Pages/auth/SignUp";
import Navbar from "./components/Navbar";
import EditFeed from "./components/feeds/EditFeed";


const App: React.FC = () =>{

 
  return(
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="feeds" element={<Feeds/>}/>
          <Route path="new" element={<CreatePost />} />
          <Route path="login" element={<LoginPage/>}/>
          <Route path="/edit" element={<EditFeed />} />
          <Route path="signup" element={<SignUp/>}/>
   
        </Routes>
      </Router>

    </div>
  )
}
export default App