import React, {useContext, useEffect, useRef, useState} from 'react';
import '../styles/LoginPage.css'
import '../styles/kform.css'
import '../styles/kmodal.css'
import Kinput from "./Kinput";
import {NavHashLink} from "react-router-hash-link";
import {AiFillCheckCircle, AiFillCloseCircle} from "react-icons/ai";
import axios, {AxiosResponse} from "axios";
import {LoginContext} from "../App";
import {Redirect} from 'react-router-dom'

function LoginPage(props: any) {
    const [loggedInUser, setLoggedInUser, isAdmin, setIsAdmin] = useContext(LoginContext);
    const modalRef: any = useRef(null);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [modalMsg, setModalMsg] = useState("");
    const [modalIcon, setModalIcon] = useState(false);
    const openModal = () => {
        //@ts-ignore
        modalRef.current.style.display = "flex"
    }
    const closeModal = () => {
        //@ts-ignore
        modalRef.current.style.display = "none"
    }
    const submitHandler = () => {
        if (email && password) {
            const info = {
                email: email,
                password: password
            }
            axios.post("/api/login", info, {withCredentials: true}).then((response: AxiosResponse) => {
                console.log(response);
                setModalMsg(response.data);
                setModalIcon(response.status === 200);
                openModal();
                axios.get("/api/user").then((response: AxiosResponse) => {
                    console.log(response.data)
                    if (response.status === 200) {
                        if (Object.keys(response.data).length === 5) {
                            setLoggedInUser(() => response.data);
                            setIsAdmin(false);
                        } else if (Object.keys(response.data).length === 1) {
                            setLoggedInUser(() => response.data);
                            setIsAdmin(true);
                        }
                    }
                })
            }).catch(error => {
                if (error.response) {
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
    if (loggedInUser !== null)
        return <Redirect to="/"/>
    return (
        <section className="login-page">
            <div className="login-page__title">فروشگاه - ورود</div>
            <form className="login-page__form kform">
                <div className="kform__row">
                    <Kinput label="ایمیل" type="email" error={""} valid={0}
                            onChange={(e: any) => setEmail(e.target.value.trim())} login/>
                </div>
                <div className="kform__row">
                    <Kinput label="رمز عبور" type="password" error={""} valid={0}
                            onChange={(e: any) => setPassword(e.target.value)} style={{marginTop: 10}} login/>
                </div>

            </form>
            <button className="kform__btn" onClick={submitHandler}>ورود</button>
            <NavHashLink to="/signup" className="login-page__signup-link">
                در فروشگاه ثبت نام کنید
            </NavHashLink>
            <div className="kmodal" ref={modalRef}>
                <div className="kmodal__content">
                    <span className="kmodal__close-btn" onClick={closeModal}>&times;</span>
                    {
                        modalIcon ? <AiFillCheckCircle className="kmodal__icon--success"/> :
                            <AiFillCloseCircle className="kmodal__icon--danger"/>
                    }
                    <p className="kmodal__msg">{modalMsg}</p>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;
