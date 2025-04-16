import Header from './Header.jsx';
import Footer from './Footer.jsx';
import {Outlet} from 'react-router-dom';


export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen bg-vanilla">
            <Header/>
            <main className="flex-1">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )

}