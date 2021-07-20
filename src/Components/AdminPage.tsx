import React, {useContext, useEffect, useRef, useState} from 'react';
import '../styles/LoginPage.css'
import '../styles/AdminPage.css'
import '../styles/ktab.css'
import '../styles/kform.css'
import '../styles/Kinput.css'
import '../styles/kmodal.css'
import Ktable from "./Ktable";
import {findAllByDisplayValue} from "@testing-library/react";
import Card from "./Card";
import {Redirect} from "react-router-dom";
import {LoginContext} from "../App";
import {AiFillCheckCircle, AiFillCloseCircle} from "react-icons/ai";
import Kinput from "./Kinput";
import axios, {AxiosResponse} from "axios";

const sampleData = () => {
    const data = []
    for (let i = 0; i < 25; i++) {
        data.push({
            code: "Shop873",
            product: "موس گیمینگ ریزر",
            price: "تومان 10.000",
            customer: "علی",
            address: "تهران، تهران، امیرکبیر"
        })
    }
    return data
}
const sampleHeaders = {
    code: "کد پیگیری",
    product: "کالا",
    price: "قیمت پرداخت شده",
    customer: "نام خریدار",
    address: "آدرس ارسال شده"
}
const sampleCategories = [
    "دسته بندی یک",
    "دسته بندی دو",
    "دسته بندی سه",
    "دسته بندی چهار",
    "دسته بندی پنج"
]

function AdminPage(props: any) {
    const [loggedInUser, setLoggedInUser, isAdmin, setIsAdmin] = useContext(LoginContext);
    const [tab, setTab] = useState("products"); // products, categories, receipt,
    const [filteredReceipt, setFilteredReceipt] = useState(sampleData())
    const [newProductName, setNewProductName] = useState("");
    const [newProductCategory, setNewProductCategory] = useState("");
    const [newProductPrice, setNewProductPrice] = useState("");
    const [newProductStock, setNewProductStock] = useState("");
    const codeInputRef = useRef(null);
    const modalRef = useRef(null);
    const allCards = [];
    const openModal = () => {
        //@ts-ignore
        modalRef.current.style.display = "flex"
    }
    const closeModal = () => {
        //@ts-ignore
        modalRef.current.style.display = "none"
    }
    useEffect(() => {
        window.onclick = (event: MouseEvent) => {
            if (event.target == modalRef.current)
                closeModal();
        }
    }, [])
    const addProductHandler = () => {
        axios.post('/api/products/add', "", {
            params: {
                name: newProductName,
                price: newProductPrice,
                category: newProductCategory,
                stock: newProductStock
            }
        }).then((response: AxiosResponse) => {
            console.log(response)
            closeModal()
        }).catch((response) => {
            console.log(response)
            closeModal()
        })
    }
    const addProductModal = <div className="kmodal__content kform">
        <span className="kmodal__close-btn" onClick={closeModal}>&times;</span>
        <form className="kform">
            <div className="kform__row">
                <Kinput label="نام محصول" type="text" error={""} valid={0}
                        onChange={(e: any) => setNewProductName(e.target.value.trim())} login/>
            </div>
            <div className="kform__row">
                <Kinput label="قیمت محصول" type="number" error={""} valid={0}
                        onChange={(e: any) => setNewProductPrice(e.target.value)} style={{marginTop: 10}} login/>
            </div>
            <div className="kform__row">
                <Kinput label="دسته بندی" type="text" error={""} valid={0}
                        onChange={(e: any) => setNewProductCategory(e.target.value)} style={{marginTop: 10}} login/>
            </div>
            <div className="kform__row">
                <Kinput label="موجودی" type="number" error={""} valid={0}
                        onChange={(e: any) => setNewProductStock(e.target.value)} style={{marginTop: 10}} login/>
            </div>

        </form>
        <button className="kform__btn" onClick={addProductHandler}>افزودن محصول</button>
    </div>

    for (let i = 0; i < 100; i++)
        allCards.push(<Card stockNumber={12} name={"موس گیمینگ ریزر"} category={"تکنولوژی"} price={100} key={`card${i}`}
                            admin={isAdmin}/>)
    const filterData = () => {
        // @ts-ignore
        if (codeInputRef.current === null || codeInputRef.current.value === "")
            setFilteredReceipt(() => sampleData())
        const newData = sampleData().filter((value: any, index: number) => {
            // @ts-ignore
            return value.code.includes(codeInputRef.current.value);
        });
        setFilteredReceipt(() => newData);
    }
    const makeCategories = () => {
        const opCell = <div>
            <button className="admin-page__cat__btn admin-page__cat__edit">ویرایش</button>
            <button className="admin-page__cat__btn admin-page__cat__remove">حذف</button>
        </div>
        return sampleCategories.map((catString: string) => {
            return {
                name: catString,
                operation: opCell
            }
        })
    }
    if (loggedInUser === null)
        return <Redirect to="/"/>
    else if (isAdmin === false || isAdmin === null)
        return <Redirect to="/"/>
    return (
        <section className="admin-page">
            <div className="admin-page__title">
                ادمین عزیز خوش آمدید
            </div>
            <div className="admin-page__tab ktab">
                <div className={`ktab__icon ktab__icon--right ${tab === "products" ? "ktab--chosen" : ""}`}
                     onClick={() => setTab(() => "products")}>
                    لیست کالا
                </div>
                <div className={`ktab__icon ktab__icon--center ${tab === "categories" ? "ktab--chosen" : ""}`}
                     onClick={() => setTab(() => "categories")}>
                    دسته بندی ها
                </div>
                <div className={`ktab__icon ktab__icon--left ${tab === "receipt" ? "ktab--chosen" : ""}`}
                     onClick={() => setTab(() => "receipt")}>
                    رسیدها
                </div>
            </div>
            {
                tab === "products" ?
                    <div>
                        <button className="admin-page__product__add" onClick={openModal}>افزودن محصول جدید</button>
                        <div className="admin-page__cards">
                            {allCards}
                        </div>
                    </div>
                    : tab === "receipt" ?
                    <div>
                        <div className="kinput" style={{margin: "15px auto"}}>
                            <div className="kinput__label" style={{width: 180}}>جست و جوی کد پیگیری</div>
                            <input
                                className="kinput__input "
                                type="text"
                                placeholder={`...کد پیگیری را برای جست و جو وارد کنید`}
                                onChange={filterData}
                                ref={codeInputRef}
                            />
                        </div>
                        <Ktable data={filteredReceipt} headers={sampleHeaders}/>
                    </div>

                    : tab === "categories" ?
                        <div>
                            <button className="admin-page__cat__add">افزودن دسته بندی جدید</button>
                            <Ktable data={makeCategories()} headers={{name: "نام دسته بندی", operation: "عملیات"}}/>
                        </div>
                        : ""
            }
            <div className="kmodal" ref={modalRef}>
                {addProductModal}
            </div>
        </section>
    );
}

export default AdminPage;
