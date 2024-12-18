import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import { useState } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import './css/Home.css'
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import logo from './assets/images/discussion_dock.png';
import Dashboard_home from "./components/Dashboard_home";
import Posts from "./components/Posts";
import Communities from "./components/Communities";
import Profile from "./components/Profile";
import UploadPost from "./components/UploadPost";
import Settings from "./components/Settings";
import General from "./components/settingsComponents/general";
import Security from "./components/settingsComponents/security";
import SeApps from "./components/settingsComponents/apps";
import Notifications from "./components/settingsComponents/notifications";
import Sharing from "./components/settingsComponents/sharing";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [flag, setFlag] = useState(false);
    const [darkmode, setdarkmode] = useState(false);
    
    return (
        <div className="w-full min-h-screen flex-col justify-start items-center ">

            {/* <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/> */}

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}  />}/> 
                <Route path="/dashboard" element={ <Dashboard darkmode={darkmode} />
                    // <PrivateRoute isLoggedIn={isLoggedIn}>
                    //     <Dashboard />
                    // </PrivateRoute>
                    }>
                    <Route path="" element={<Dashboard_home/>} />
                    <Route path="communities" element={<Communities />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="upload" element={<UploadPost setFlag={setFlag}/>} />
                    <Route path="communities/upload" element={<UploadPost setFlag={setFlag}/>} />
                    <Route path="settings" element={<Settings />}>
                        <Route path="" element={<General darkmode={darkmode} setdarkmode={setdarkmode} />} />
                        <Route path="security" element={<Security />} />
                        <Route path="notifications" element={<Notifications />} />
                        <Route path="apps" element={<SeApps />} />
                        <Route path="sharing" element={<Sharing />} />
                    </Route>
                    <Route path="communities/settings" element={<Settings />}>
                        <Route path="" element={<General darkmode={darkmode} setdarkmode={setdarkmode} />} />
                        <Route path="security" element={<Security />} />
                        <Route path="notifications" element={<Notifications />} />
                        <Route path="apps" element={< SeApps />} />
                        <Route path="sharing" element={<Sharing />} />
                    </Route>
                </Route>
            </Routes>
                


            {/* <Route path="/dashboard" element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
                        <Route element={<Dashboard />}>
                            <Route index element={<Posts flag={flag} />} />
                            <Route path="communities" element={<Communities />} />
                        </Route>
                    </Route> */}


        </div>
  )
}

export default App
