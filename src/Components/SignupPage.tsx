import React from 'react';
import Finput from "./Finput";
import '../styles/LoginPage.css'

function SignupPage(props:any) {
    return (
        <section className="login-page">
            <div className="login-page__title">فروشگاه - ثبت نام</div>
            <div className="login-page__form">
                <div className="login-page__form__row">
                    <Finput label="نام خانوادگی" left/>
                    <Finput label="نام" right />
                </div>
                <div className="login-page__form__row" style={{marginTop: 10}}>
                    <Finput label="رمز عبور" type="password" left/>
                    <Finput label="ایمیل" type="email" right />
                </div>
                <div className="login-page__form__row" style={{marginTop: 10}}>
                    <Finput label="آدرس" big/>
                </div>
            </div>
            <button className="login-page__btn">ثبت نام</button>
        </section>
    );
}

export default SignupPage;