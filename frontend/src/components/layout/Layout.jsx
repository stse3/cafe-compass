import Header from './Header.jsx';
import Footer from './Footer.jsx';


export default function Layout({children}) {
    return (
        <div className="flex flex-col min-h-screen bg-vanilla">
            <Header/>
            <main className="flex-1">
                {children}
            </main>
            <Footer/>
        </div>
    )

}