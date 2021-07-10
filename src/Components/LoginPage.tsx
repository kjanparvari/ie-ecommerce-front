import React, {useEffect, useRef} from 'react';
import '../styles/LoginPage.css'
import '../styles/kform.css'
import Kinput from "./Kinput";

function LoginPage(props: any) {
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
        const email = validation.email();
        const password = validation.password();
        if (email && password)
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
            <div className="login-page__title">فروشگاه - ورود</div>
            <form className="login-page__form kform">
                <div className="kform__row">
                    <Kinput label="ایمیل" type="email" validation={validation} login/>
                </div>
                <div className="kform__row">
                    <Kinput label="رمز عبور" type="password" validation={validation} style={{marginTop: 10}} login/>
                </div>

            </form>
            <button className="kform__btn" onClick={submitHandler}>ورود</button>
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

export default LoginPage;