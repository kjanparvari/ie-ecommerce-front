import React from 'react';
import '../styles/Navbar.css'

const Navbar = (props: any) => {
    const loggedIn = false;
    return (
        <nav className="navbar">
            <button className="nav-logo">
                فروشگاه
            </button>
            <button className="nav-btn">
                صفحه اول
            </button>
            <button className="nav-btn">
                تماس با ما
            </button>
            <button className="nav-btn">
                پشتیبانی
            </button>
            <button className="nav-btn">
                محصولات
            </button>
            {
                loggedIn ?
                <button className="login-btn">
                ورود / ثبت نام
                </button> :
                <div className="dropdown">
                    <button className="dropdown__btn">{"کامیار جان پروری"}</button>
                    <div className="dropdown__content">
                        <button>پروفایل</button>
                        <button>خروج از حساب</button>
                    </div>
                </div>
            }

        </nav>
    );
};

export default Navbar;