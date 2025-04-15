import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/layout/Layout'
import CafeListing from './pages/CafeListingPage';
import HomePage from './pages/HomePage';
import CafeDetail from './pages/CafeDetailPage';


export default function App (){
    return (
        <BrowserRouter>
            <Layout> 
                <Routes>
                    <Route path="/" element={<HomePage/>}></Route>
                    <Route path="/search" element={<CafeListing/>}></Route>
                    <Route path="/cafe/:id" element={<CafeDetail/>}></Route>
                </Routes>
            </Layout>
        </BrowserRouter>


    )

}