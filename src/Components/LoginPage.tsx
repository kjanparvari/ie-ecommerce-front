import React from 'react';
import '../styles/LoginPage.css'
import Finput from "./Finput";

function LoginPage(props:any) {
    return (
        <section className="login-page">
            <div className="login-page__title">فروشگاه - ورود</div>
            <div className="login-page__form">
                <Finput label="ایمیل" type="email" />
                <Finput label="رمز عبور" type="password" style={{marginTop: 10}}/>
            </div>
            <button className="login-page__btn">ورود</button>
        </section>
    );
}

export default LoginPage;