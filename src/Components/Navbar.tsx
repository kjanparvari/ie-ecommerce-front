import React from 'react';
import '../styles/Navbar.css'

const Navbar = (props: any) => {
    const loggedIn = true;
    return (
        <nav className="navbar">
            <button className="navbar__log">
                فروشگاه
            </button>
            <button className="navbar__btn">
                صفحه اول
            </button>
            <button className="navbar__btn">
                تماس با ما
            </button>
            <button className="navbar__btn">
                پشتیبانی
            </button>
            <button className="navbar__btn">
                محصولات
            </button>
            {
                !loggedIn ?
                <button className="navbar__login-btn">
                ورود / ثبت نام
                </button> :
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