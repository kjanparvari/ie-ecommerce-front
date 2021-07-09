import React from 'react';
import Kinput from "./Kinput";
import '../styles/LoginPage.css'
import '../styles/kform.css'

function SignupPage(props:any) {
    return (
        <section className="login-page">
            <div className="login-page__title">فروشگاه - ثبت نام</div>
            <div className="login-page__form kform">
                <div className="kform__row">
                    <Kinput label="نام خانوادگی" left/>
                    <Kinput label="نام" right />
                </div>
                <div className="kform__row" style={{marginTop: 10}}>
                    <Kinput label="رمز عبور" type="password" left/>
                    <Kinput label="ایمیل" type="email" right />
                </div>
                <div className="kform__row" style={{marginTop: 10}}>
                    <Kinput label="آدرس" big/>
                </div>
            </div>
            <button className="kform__btn">ثبت نام</button>
        </section>
    );
}

export default SignupPage;