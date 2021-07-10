import React from 'react'
import './App.css';
import HomePage from "./Components/HomePage";
import Navbar from "./Components/Navbar";
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import UserPage from "./Components/UserPage";

const App = () => {
    return (
        <div className="App">
            <header>
                <Navbar/>
            </header>
            {/*<HomePage/>*/}
            <LoginPage/>
            {/*<SignupPage/>*/}
            {/*<UserPage/>*/}
            <footer className="footer">
                <div className="footer-inner">
                    تمامی حقوق برای توسعه دهندگان محفوظ است
                </div>
            </footer>
        </div>
    );
}

export default App;
