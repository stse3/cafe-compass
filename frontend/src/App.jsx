import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/layout/Layout'
import CafeListing from './pages/CafeListingPage';
import Home from './pages/HomePage';
import CafeDetail from './pages/CafeDetailPage';
import Login from './components/auth/LoginPage';
import Profile from './pages/ProfilePage';
import{ AuthProvider} from './context/authContext';

export default function App (){
    return (
        <AuthProvider>
            <BrowserRouter>
            
            <Routes>
                {/* login page */}
                
                <Route element={<Layout/>}>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/search" element={<CafeListing/>}></Route>
                    <Route path="/cafe/:id" element={<CafeDetail/>}></Route>
                    <Route path="/profile" element={<Profile/>}></Route>
                </Route>
            </Routes>

    </BrowserRouter>
        </AuthProvider>



    )

}