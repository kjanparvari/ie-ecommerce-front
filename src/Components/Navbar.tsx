import React, {useContext, useEffect, useRef, useState} from 'react';
import '../styles/Navbar.css'
import '../styles/kform.css'
import {Link} from "react-router-dom";
import {HashLink, NavHashLink} from 'react-router-hash-link'
import {LoginContext} from "../App";
import axios, {AxiosResponse} from "axios";
import {AiFillCheckCircle, AiFillCloseCircle} from "react-icons/ai";

const Navbar = (props: any) => {
        const [loggedInUser, setLoggedInUser, isAdmin, setIsAdmin] = useContext(LoginContext);
        const modalRef: any = useRef(null);
        const openModal = () => {
            //@ts-ignore
            modalRef.current.style.display = "flex"
        }
        const closeModal = () => {
            //@ts-ignore
            modalRef.current.style.display = "none"
        }
        const logout = () => {
            axios.post("/api/logout", "", {withCredentials: true}).then((response: AxiosResponse) => {
                if (response.status === 200) {
                    setLoggedInUser(null);
                    setIsAdmin(false);
                }
            }).catch(error => {
                if (error.response) {
                    console.log(error.response);
                }
            })
        }
        useEffect(() => {
            window.onclick = (event: MouseEvent) => {
                if (event.target == modalRef.current)
                    closeModal();
            }
        }, [])
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
                <NavHashLink to="/#products-section" className="navbar__btn">
                    محصولات
                </NavHashLink>
                {
                    loggedInUser === null ?
                        <NavHashLink to="/login" className="navbar__login-btn">
                            ورود / ثبت نام
                        </NavHashLink> :
                        <div className="navbar__dropdown">
                            <button className="navbar__dropdown__btn">
                                {isAdmin ? "ادمین" : `${loggedInUser.firstname} ${loggedInUser.lastname}`}
                            </button>
                            <div className="navbar__dropdown__content">
                                <NavHashLink to={isAdmin ? "/admin" : "/user"} className="navbar__dropdown__option">
                                    {isAdmin ? "پنل ادمین" : "پروفایل"}
                                </NavHashLink>

                                <button className="navbar__dropdown__option" onClick={openModal}>خروج از حساب</button>
                            </div>
                        </div>
                }
                <div className="kmodal" ref={modalRef}>
                    <div className="kmodal__content">
                        <span className="kmodal__close-btn" onClick={closeModal}>&times;</span>
                        <div>
                            ?مطمئن هستید می خواهید خارج شوید
                        </div>
                        <div className="kform__row" style={{padding: 20}}>
                            <button className="kform__btn kform__btn--success" style={{width: 150}}
                                    onClick={closeModal}>خیر
                            </button>
                            <button className="kform__btn kform__btn--danger" style={{width: 150}} onClick={() => {
                                logout()
                                closeModal()
                            }}>بلی
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
;

export default Navbar;