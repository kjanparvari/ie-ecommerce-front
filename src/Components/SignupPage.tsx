import React, {useEffect, useRef, useState} from 'react';
import Kinput from "./Kinput";
import '../styles/LoginPage.css'
import '../styles/kform.css'

function SignupPage(props: any) {
    const modalRef = useRef(null);
    let validation: any = {}
    const openModal = () => {
        //@ts-ignore
        modalRef.current.style.display = "flex"
    }
    const closeModal = () => {
        //@ts-ignore
        modalRef.current.style.display = "none"
    }
    const submitHandler = () => {
        const firstname = validation.firstname();
        const lastname = validation.lastname();
        const email = validation.email();
        const password = validation.password();
        const address = validation.address();
        if (firstname && lastname && email && password && address)
            openModal();
    }
    useEffect(() => {
        window.onclick = (event: MouseEvent) => {
            if (event.target == modalRef.current)
                closeModal();
        }
    }, [])
    return (
        <section className="login-page">
            <div className="login-page__title">فروشگاه - ثبت نام</div>
            <form className="login-page__form kform">
                <div className="kform__row">
                    <Kinput label="نام خانوادگی" type="lastname" validation={validation} left/>
                    <Kinput label="نام" type="firstname" validation={validation} right/>
                </div>
                <div className="kform__row" style={{marginTop: 10}}>
                    <Kinput label="رمز عبور" type="password" validation={validation} left/>
                    <Kinput label="ایمیل" type="email" validation={validation} right/>
                </div>
                <div className="kform__row" style={{marginTop: 10}}>
                    <Kinput label="آدرس" type="address" validation={validation} big/>
                </div>
            </form>
            <button className="kform__btn" onClick={submitHandler}>ثبت نام</button>
            <div className="login-page__modal" ref={modalRef}>
                <div className="login-page__modal__content">
                    <span className="login-page__modal__close-btn" onClick={closeModal}>&times;</span>
                    <p>All cockroachs rob cloudy, dead seas.</p>
                    <br/>
                    <br/>
                </div>
            </div>
        </section>
    );
}

export default SignupPage;