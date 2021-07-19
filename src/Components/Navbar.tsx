import React, {useContext, useState} from 'react';
import '../styles/Navbar.css'
import {Link} from "react-router-dom";
import {HashLink, NavHashLink} from 'react-router-hash-link'
import {LoginContext} from "../App";
import axios, {AxiosResponse} from "axios";

const Navbar = (props: any) => {
    const [loggedInUser, setLoggedInUser] = useContext(LoginContext);
    const logout = () => {
        axios.post("/api/logout", "", {withCredentials: true}).then((response: AxiosResponse) => {
            if (response.status === 200) {
                setLoggedInUser(null)
            }
        }).catch(error => {
            if (error.response) {
                console.log(error.response);
            }
        })
    }
    return (
        <nav className="navbar">
            <button className="navbar__log">
                فروشگاه
            </button>
            <Link to="/" className="navbar__btn">
                صفحه اول
            </Link>
            <Link to="/contactus" className="navbar__btn">
                تماس با ما
            </Link>
            <Link to="/support" className="navbar__btn">
                پشتیبانی
            </Link>
            <NavHashLink to="/#production-section" className="navbar__btn">
                محصولات
            </NavHashLink>
            {
                loggedInUser === null ?
                    <NavHashLink to="/login" className="navbar__login-btn">
                        ورود / ثبت نام
                    </NavHashLink> :
                    <div className="navbar__dropdown">
                        <button
                            className="navbar__dropdown__btn">{`${loggedInUser.firstname} ${loggedInUser.lastname}`}</button>
                        <div className="navbar__dropdown__content">
                            <NavHashLink to="/user" className="navbar__dropdown__option">پروفایل</NavHashLink>
                            <button className="navbar__dropdown__option" onClick={logout}>خروج از حساب</button>
                        </div>
                    </div>
            }

        </nav>
    );
};

export default Navbar;