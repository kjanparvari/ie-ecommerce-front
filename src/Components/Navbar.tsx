import React from 'react';
import '../styles/Navbar.css'

const Navbar = (props: any) => {
    return (
        <nav className="navbar">
            <a className="nav-logo" href="#store">
                فروشگاه
            </a>
            <a className="nav-btn" href="#firstPage">
                صفحه اول
            </a>
            <a className="nav-btn" href="#contactUs">
                تماس با ما
            </a>
            <a className="nav-btn" href="#support">
                پشتیبانی
            </a>
            <a className="nav-btn" href="#products">
                محصولات
            </a>
            <a className="login-btn" href="#login">
                ورود / ثبت نام
            </a>

        </nav>
    );
}

export default Navbar;