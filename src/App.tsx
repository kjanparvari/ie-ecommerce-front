import React, {useState} from 'react'
import './App.css';
import HomePage from "./Components/HomePage";
import Navbar from "./Components/Navbar";
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import UserPage from "./Components/UserPage";
import AdminPage from "./Components/AdminPage";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

const App = () => {
    // const [loggedIn, setLoggedIn] = useState( false);
    return (
        <div className="App">
            <Router>
                <header>
                    <Navbar/>
                </header>
                <Switch>
                    <Route exact path="/">
                        <HomePage/>
                    </Route>
                    <Route exact path="/login">
                        <LoginPage/>
                    </Route>
                    <Route exact path="/signup">
                        <SignupPage/>
                    </Route>
                    <Route exact path="/user">
                        <UserPage/>
                    </Route>
                    <Route exact path="/admin">
                        <AdminPage/>
                    </Route>
                </Switch>
            </Router>

            <footer className="footer">
                <div className="footer-inner">
                    تمامی حقوق برای توسعه دهندگان محفوظ است
                </div>
            </footer>
        </div>
    );
}

export default App;
