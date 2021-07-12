import React, {useEffect, useRef, useState} from 'react';
import '../styles/UserPage.css'
import '../styles/LoginPage.css'
import '../styles/ktab.css'
import '../styles/kform.css'
import Kinput from "./Kinput";
import Ktable from "./Ktable";

const sampleData = () => {
    const data = []
    for (let i = 0; i < 25; i++) {
        data.push({
            code: "Shop873",
            product: "موس گیمینگ ریزر",
            price: "تومان 10.000",
            address: "تهران، تهران، امیرکبیر"
        })
    }
    return data
}
const sampleHeaders = {
    code: "کد پیگیری",
    product: "کالا",
    price: "قیمت پرداخت شده",
    address: "آدرس ارسال شده"
}

function UserPage(props: any) {
    const [tab, setTab] = useState("receipt"); // profile, receipt
    const name = "کامیار"
    const price = "10.000"
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
        <section className="user-page">
            <div className="user-page__title">
                <div className="user-page__title__welcome">{`  ${name} عزیز خوش آمدید`}</div>
                <div className="user-page__title__balance-msg">{`موجودی حساب شما: ${price}`}</div>
                <button className="user-page__title__balance-btn">افزایش موجودی</button>
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
                        <button className="kform__btn" onClick={submitHandler}>ویرایش اطلاعات</button>
                    </div>
                    : tab === "receipt" ?
                    <Ktable data={sampleData()} headers={sampleHeaders}/>
                    : ""
            }
        </section>
    );
}

export default UserPage;