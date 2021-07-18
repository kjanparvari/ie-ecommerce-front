import React, {useEffect, useRef, useState} from 'react';
import '../styles/LoginPage.css'
import '../styles/kform.css'
import Kinput from "./Kinput";
import {NavHashLink} from "react-router-hash-link";
import {AiFillCheckCircle, AiFillCloseCircle} from "react-icons/ai";
import axios, {AxiosResponse} from "axios";

function LoginPage(props: any) {
    const modalRef = useRef(null);
    const [modalMsg, setModalMsg] = useState("");
    const [modalIcon, setModalIcon] = useState(false);
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
        if (email && password){
            const info = {
                email: email,
                password: password
            }
            axios.post("/api/login", info).then((response: AxiosResponse) => {
                console.log(response);
                setModalMsg(response.data);
                setModalIcon(response.status === 200);
                openModal();
            }).catch(error => {
                if (error.response){
                    console.log(error.response);
                    setModalMsg(error.response.data);
                    setModalIcon(error.response.status === 200);
                    openModal();
                }
            })
        }
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
            <NavHashLink to="/signup" className="login-page__signup-link">
                در فروشگاه ثبت نام کنید
            </NavHashLink>
            <div className="login-page__modal" ref={modalRef}>
                <div className="login-page__modal__content">
                    <span className="login-page__modal__close-btn" onClick={closeModal}>&times;</span>
                    {
                        modalIcon ? <AiFillCheckCircle className="login-page__modal__icon--success"/> :
                            <AiFillCloseCircle className="login-page__modal__icon--danger"/>
                    }
                    <p className="login-page__modal__msg">{modalMsg}</p>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;