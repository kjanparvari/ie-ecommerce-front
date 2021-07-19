import React, {useEffect, useState} from 'react'
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
import axios, {AxiosResponse} from "axios";

export const LoginContext: any = React.createContext([null, null, null, null])
const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        axios.get("/api/user").then((response: AxiosResponse) => {
            console.log(response.data)
            if (response.status === 200) {
                if (Object.keys(response.data).length === 5) {
                    setLoggedInUser(() => response.data);
                    setIsAdmin(false);
                } else if (Object.keys(response.data).length === 1) {
                    setLoggedInUser(() => response.data);
                    setIsAdmin(true);
                }
            }
        })
    }, [])
    return (
        <div className="App">
            <LoginContext.Provider value={[loggedInUser, setLoggedInUser, isAdmin, setIsAdmin]}>
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
            </LoginContext.Provider>

        </div>
    );
}

export default App;
