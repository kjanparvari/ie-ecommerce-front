import React from 'react';
import '../styles/Navbar.css'
import {Link} from "react-router-dom";
import {HashLink, NavHashLink} from 'react-router-hash-link'

const Navbar = (props: any) => {
    const loggedIn = false;
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
                !loggedIn ?
                    <NavHashLink to="/login" className="navbar__login-btn">
                        ورود / ثبت نام
                    </NavHashLink> :
                    <div className="navbar__dropdown">
                        <button className="navbar__dropdown__btn">{"کامیار جان پروری"}</button>
                        <div className="navbar__dropdown__content">
                            <button>پروفایل</button>
                            <button>خروج از حساب</button>
                        </div>
                    </div>
            }

        </nav>
    );
};

export default Navbar;