import React, {useEffect, useRef, useState} from 'react';
import Kinput from "./Kinput";
import '../styles/LoginPage.css'
import '../styles/kform.css'
import axios, {AxiosError, AxiosResponse} from 'axios'
import {AiFillCheckCircle, AiFillCloseCircle} from 'react-icons/ai'

function SignupPage(props: any) {
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
    const submitHandler = (event: any) => {
        event.preventDefault()
        const firstname = validation.firstname();
        const lastname = validation.lastname();
        const email = validation.email();
        const password = validation.password();
        const address = validation.address();
        if (firstname && lastname && email && password && address) {
            const info = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                address: address
            }
            axios.post("/api/signup", info).then((response: AxiosResponse) => {
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
            <div className="login-page__title">فروشگاه - ثبت نام</div>
            <div className="login-page__form kform">
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
            </div>
            <button className="kform__btn" onClick={(event) => submitHandler(event)}>ثبت نام</button>
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

export default SignupPage;