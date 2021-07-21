import React, {useContext, useEffect, useRef, useState} from 'react';
import '../styles/UserPage.css'
import '../styles/LoginPage.css'
import '../styles/ktab.css'
import '../styles/kform.css'
import Kinput from "./Kinput";
import Ktable from "./Ktable";
import {Redirect} from "react-router-dom";
import {LoginContext} from "../App";
import {log} from "util";
import axios, {AxiosResponse} from "axios";
import {AiFillCheckCircle, AiFillCloseCircle} from "react-icons/ai";


const sampleHeaders = {
    tracing_code: "کد پیگیری",
    product_name: "کالا",
    sold_number: "تعداد فروش",
    customer_email: "ایمیل خریدار",
    customer_firstname: "نام خریدار",
    customer_lastname: "نام خانوادگی خریدار",
    customer_address: "آدرس ارسال شده",
    amount: "قیمت پرداخت شده",
    date: "تاریخ",
    status: "وضعیت"
}


function UserPage(props: any) {
    const [loggedInUser, setLoggedInUser, isAdmin, setIsAdmin] = useContext(LoginContext);
    const [tab, setTab] = useState("profile"); // profile, receipt
    const [userInfo, setUserInfo]: any = useState(loggedInUser)
    const emailRef: any = useRef(null)
    const passwordRef: any = useRef(null)
    const firstnameRef: any = useRef(null)
    const lastnameRef: any = useRef(null)
    const addressRef: any = useRef(null)
    const newBalanceRef: any = useRef(null)
    const modalRef = useRef(null);
    const [modalMsg, setModalMsg] = useState("موجودی اضافه شد");
    const [modalIcon, setModalIcon] = useState(true);
    const [receipts, setReceipts]: any = useState([])
    const [modalContent, setModalContent]: any = useState("")
    const openModal = () => {
        //@ts-ignore
        modalRef.current.style.display = "flex"
    }
    const closeModal = () => {
        //@ts-ignore
        modalRef.current.style.display = "none"
    }
    const editResultModal = () => <div className="kmodal__content">
        <span className="kmodal__close-btn" onClick={closeModal}>&times;</span>
        {
            modalIcon ? <AiFillCheckCircle className="kmodal__icon--success"/> :
                <AiFillCloseCircle className="kmodal__icon--danger"/>
        }
        <p className="kmodal__msg">{modalMsg}</p>
    </div>
    const editUserHandler = () => {
        axios.post("/api/user/modify", "", {
            params: {
                firstname: firstnameRef.current.value,
                lastname: lastnameRef.current.value,
                address: addressRef.current.value,
                balance: userInfo.balance,
                password: passwordRef.current.value
            }
        }).then((response: AxiosResponse) => {
            if (response.status === 200) {
                setModalIcon(true)
                setModalMsg(response.data)
                setModalContent(editResultModal())
                requestForInfo()
            }

        }).catch((response: any) => {
            setModalContent(editResultModal())
            setModalIcon(false)
            setModalMsg(response.data)
        })
    }
    const addBalanceHandler = () => {
        axios.post("/api/user/riseBalance", "", {
            params: {
                amount: newBalanceRef.current.value
            }
        }).then((response: AxiosResponse) => {
            if (response.status === 200) {
                setModalIcon(true)
                setModalMsg(response.data)
                setModalContent(editResultModal())
                requestForInfo()
            }

        }).catch((response: any) => {
            setModalContent(editResultModal())
            setModalIcon(false)
            setModalMsg(response.data)
        })
    }
    // useEffect(()=> {
    //     setModalContent(editResultModal())
    // }, [modalMsg, modalMsg])
    const addBalanceModal = () => {
        return <div className="kmodal__content">
            <div className="kform__row">
                <Kinput label="اعتبار" type="number" error={""} valid={0}
                        inputRef={newBalanceRef}
                        login/>
            </div>
            <button className="kform__btn kform__btn--success" style={{marginTop: 10, width: 150}}
                    onClick={addBalanceHandler}>
                افزایش
            </button>
        </div>
    }
    const requestForInfo = () => {
        axios.get("/api/user").then((response: AxiosResponse) => {
            if (response.status === 200) {
                loggedInUser.firstname = firstnameRef.current.value = response.data.firstname
                loggedInUser.lastname = lastnameRef.current.value = response.data.lastname
                loggedInUser.email = emailRef.current.value = response.data.email
                loggedInUser.address = addressRef.current.value = response.data.address
                loggedInUser.balance = response.data.balance
                passwordRef.current.value = ""
                setUserInfo(response.data)
            }
        })
    }
    const requestForReceipts = () => {
        axios.get("/api/receipt").then((response: AxiosResponse) => {
            if (response.status === 200) {
                console.log("user page getting receipts")
                console.log(response.data)
                setReceipts(() => response.data)
            }
        })
    }
    useEffect(() => {
        requestForReceipts()
        requestForInfo()
        window.onclick = (event: MouseEvent) => {
            if (event.target == modalRef.current)
                closeModal();
        }
    }, [])
    if (loggedInUser === null || isAdmin === true)
        return <Redirect to="/"/>
    return (
        <section className="user-page">
            <div className="user-page__title">
                <div className="user-page__title__welcome">{`  ${userInfo.firstname} عزیز خوش آمدید`}</div>
                <div className="user-page__title__balance-msg">{`موجودی حساب شما: ${userInfo.balance}`}</div>
                <button className="user-page__title__balance-btn" onClick={() => {
                    setModalContent(() => addBalanceModal())
                    openModal()
                }}>افزایش موجودی
                </button>
            </div>
            <div className="user-page__tab ktab">
                <div className={`ktab__icon ktab__icon--right ${tab === "profile" ? "ktab--chosen" : ""}`}
                     onClick={() => setTab(() => "profile")}>
                    پروفایل
                </div>
                <div className={`ktab__icon ktab__icon--left ${tab === "receipt" ? "ktab--chosen" : ""}`}
                     onClick={() => setTab(() => "receipt")}>
                    رسیدها
                </div>
            </div>
            {
                tab === "profile" ?
                    <div className="user-page__profile">
                        <form className="login-page__form kform">
                            <div className="kform__row">
                                <Kinput label="نام خانوادگی" inputRef={lastnameRef} type="lastname" left/>
                                <Kinput label="نام" inputRef={firstnameRef} type="firstname" right/>
                            </div>
                            <div className="kform__row" style={{marginTop: 10}}>
                                <Kinput label="رمز عبور" inputRef={passwordRef} type="password" left/>
                                <Kinput label="ایمیل" inputRef={emailRef} disabled type="email" right/>
                            </div>
                            <div className="kform__row" style={{marginTop: 10}}>
                                <Kinput label="آدرس" inputRef={addressRef} type="address" big/>
                            </div>
                        </form>
                        <button className="kform__btn" onClick={editUserHandler}>ویرایش اطلاعات</button>
                    </div>
                    : tab === "receipt" ?
                    <Ktable data={receipts} headers={sampleHeaders}/>
                    : ""
            }
            <div className="kmodal" ref={modalRef}>
                {modalContent}
            </div>
        </section>
    );
}

export default UserPage;