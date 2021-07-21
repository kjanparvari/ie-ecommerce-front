import React, {useContext, useEffect, useRef, useState} from 'react';
import Kinput from "./Kinput";
import '../styles/LoginPage.css'
import '../styles/kform.css'
import '../styles/kmodal.css'
import axios, {AxiosError, AxiosResponse} from 'axios'
import {AiFillCheckCircle, AiFillCloseCircle} from 'react-icons/ai'
import {LoginContext} from "../App";
import {Redirect} from 'react-router-dom'

function SignupPage(props: any) {
    const [loggedInUser, setLoggedInUser, isAdmin, setIsAdmin] = useContext(LoginContext);
    const modalRef = useRef(null);
    const [modalMsg, setModalMsg] = useState("");
    const [modalIcon, setModalIcon] = useState(false);
    const [email, setEmail] = useState({value: "", error: "", valid: 0})
    const [password, setPassword] = useState({value: "", error: "", valid: 0})
    const [firstname, setFirstname] = useState({value: "", error: "", valid: 0})
    const [lastname, setLastname] = useState({value: "", error: "", valid: 0})
    const [address, setAddress] = useState({value: "", error: "", valid: 0})
    const emailFirstUpdate = useRef(true)
    const passwordFirstUpdate = useRef(true)
    const firstnameFirstUpdate = useRef(true)
    const lastnameFirstUpdate = useRef(true)
    const addressFirstUpdate = useRef(true)
    const openModal = () => {
        //@ts-ignore
        modalRef.current.style.display = "flex"
    }
    const closeModal = () => {
        //@ts-ignore
        modalRef.current.style.display = "none"
    }
    useEffect(() => {
        if (emailFirstUpdate.current) {
            emailFirstUpdate.current = false
            return
        }
        console.log("here")
        if (email.value === "") {
            setEmail(prev => {
                return {
                    value: prev.value,
                    valid: -1,
                    error: "ایمیل نمی تواند خالی باشد"
                }
            })
            return;
        }
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email.value).toLowerCase())) {
            setEmail(prev => {
                return {
                    value: prev.value,
                    valid: -1,
                    error: "فرمت ایمیل معتبر نیست"
                }
            })
            return;
        }
        if (email.value.length > 255) {
            setEmail(prev => {
                return {
                    value: prev.value,
                    valid: -1,
                    error: "اندازه ایمیل نمی تواند بیشتر از 255 باشد"
                }
            })
            return;
        }
        setEmail(prev => {
            return {
                value: prev.value,
                valid: 1,
                error: ""
            }
        })
        return;

    }, [email.value])
    useEffect(() => {
        if (passwordFirstUpdate.current) {
            passwordFirstUpdate.current = false
            return
        }
        if (password.value === "" && password) {
            setPassword(prev => {
                return {
                    value: prev.value,
                    valid: -1,
                    error: "رمزعبور نمی تواند خالی باشد"
                }
            })
            return;
        }
        if (password.value.length < 8) {
            setPassword(prev => {
                return {
                    value: prev.value,
                    valid: -1,
                    error: "طول پسورد باید حداقل 8 باشد"
                }
            })
            return;
        } else if (password.value.search(/[a-zA-Z]/) == -1 || password.value.search(/\d/) == -1) {
            setPassword(prev => {
                return {
                    value: prev.value,
                    valid: -1,
                    error: "پسورد باید شامل حرف و عدد باشد"
                }
            })
            return undefined;
        }
        if (password.value.length > 255) {
            setPassword(prev => {
                return {
                    value: prev.value,
                    valid: -1,
                    error: "اندازه پسورد نمی تواند بیشتر از 255 باشد"
                }
            })
            return;
        }
        setPassword(prev => {
            return {
                value: prev.value,
                valid: 1,
                error: ""
            }
        })
        return;
    }, [password.value])
    useEffect(() => {
        if (firstnameFirstUpdate.current) {
            firstnameFirstUpdate.current = false
            return
        }
        if (firstname.value === "" && firstname) {
            setFirstname(prev => {
                return {
                    value: prev.value,
                    valid: -1,
                    error: "نام نمی تواند خالی باشد"
                }
            })
            return;
        }
        if (firstname.value.length > 255) {
            setFirstname(prev => {
                return {
                    value: prev.value,
                    valid: -1,
                    error: "اندازه نام نمی تواند بیشتر از 255 باشد"
                }
            })
            return;
        }
        setFirstname(prev => {
            return {
                value: prev.value,
                valid: 1,
                error: ""
            }
        })
        return;
    }, [firstname.value])
    useEffect(() => {
        if (lastnameFirstUpdate.current) {
            lastnameFirstUpdate.current = false
            return
        }
        if (lastname.value === "" && lastname) {
            setLastname(prev => {
                return {
                    value: prev.value,
                    valid: -1,
                    error: "نام خانوادگی نمی تواند خالی باشد"
                }
            })
            return;
        }
        if (lastname.value.length > 255) {
            setLastname(prev => {
                return {
                    value: prev.value,
                    valid: -1,
                    error: "اندازه نام خانوادگی نمی تواند بیشتر از 255 باشد"
                }
            })
            return;
        }
        setLastname(prev => {
            return {
                value: prev.value,
                valid: 1,
                error: ""
            }
        })
        return;
    }, [lastname.value])
    useEffect(() => {
        if (addressFirstUpdate.current) {
            addressFirstUpdate.current = false
            return
        }
        if (address.value === "" && address) {
            setAddress(prev => {
                return {
                    value: prev.value,
                    valid: -1,
                    error: "آدرس نمی تواند خالی باشد"
                }
            })
            return;
        }
        if (address.value.length > 1000) {
            setAddress(prev => {
                return {
                    value: prev.value,
                    valid: -1,
                    error: "اندازه آدرس نمی تواند بیشتر از 1000 باشد"
                }
            })
            return;
        }
        setAddress(prev => {
            return {
                value: prev.value,
                valid: 1,
                error: ""
            }
        })
        return;
    }, [address.value])
    const submitHandler = (event: any) => {
        event.preventDefault()
        // console.log(firstname)
        // console.log(lastname)
        // console.log(address)
        // console.log(email)
        console.log(password)
        if (firstname.valid === 1 && lastname.valid === 1 && email.valid === 1 && password.valid === 1 && address.valid === 1) {
            const info = {
                firstname: firstname.value,
                lastname: lastname.value,
                email: email.value,
                password: password.value,
                address: address.value
            }
            axios.post("/api/signup", info).then((response: AxiosResponse) => {
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
            <div className="login-page__title">فروشگاه - ثبت نام</div>
            <div className="login-page__form kform">
                <div className="kform__row">
                    <Kinput label="نام خانوادگی" type="lastname" error={lastname.error} valid={lastname.valid}
                            onChange={(event: any) => setLastname((prev) => {
                                return {...prev, ['value']: event.target.value.trim()}
                            })} left/>
                    <Kinput label="نام" type="firstname" error={firstname.error} valid={firstname.valid}
                            onChange={(event: any) => setFirstname((prev) => {
                                return {...prev, ['value']: event.target.value.trim()}
                            })} right/>
                </div>
                <div className="kform__row" style={{marginTop: 10}}>
                    <Kinput label="رمز عبور" type="password" error={password.error} valid={password.valid}
                            onChange={(event: any) => setPassword((prev) => {
                                return {...prev, ['value']: event.target.value}
                            })} left/>
                    <Kinput label="ایمیل" type="email" error={email.error} valid={email.valid}
                            onChange={(event: any) => setEmail((prev) => {
                                return {...prev, ['value']: event.target.value.trim()}
                            })} right/>
                </div>
                <div className="kform__row" style={{marginTop: 10}}>
                    <Kinput label="آدرس" type="address" error={address.error} valid={address.valid}
                            onChange={(event: any) => setAddress((prev) => {
                                return {...prev, ['value']: event.target.value.trim()}
                            })} big/>
                </div>
            </div>
            <button className="kform__btn" onClick={(event) => submitHandler(event)}>ثبت نام</button>
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

export default SignupPage;