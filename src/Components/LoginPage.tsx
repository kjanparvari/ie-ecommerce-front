import React from 'react';
import '../styles/LoginPage.css'
import '../styles/kform.css'
import Kinput from "./Kinput";

function LoginPage(props:any) {
    return (
        <section className="login-page">
            <div className="login-page__title">فروشگاه - ورود</div>
            <div className="login-page__form kform">
                <Kinput label="ایمیل" type="email" />
                <Kinput label="رمز عبور" type="password" style={{marginTop: 10}}/>
            </div>
            <button className="kform__btn">ورود</button>
        </section>
    );
}

export default LoginPage;