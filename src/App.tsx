import React from 'react'
import './App.css';
import HomePage from "./Components/HomePage";
import Navbar from "./Components/Navbar";

const App = () => {
    return (
        <div className="App">
            <Navbar/>
            <HomePage/>
            <footer className="footer">
                <div className="footer-inner">
                    تمامی حقوق برای توسعه دهندگان محفوظ است
                </div>

            </footer>
        </div>
    );
}

export default App;
