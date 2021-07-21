import React, {useContext, useEffect, useRef, useState} from 'react';
import '../styles/LoginPage.css'
import '../styles/AdminPage.css'
import '../styles/ktab.css'
import '../styles/kform.css'
import '../styles/Kinput.css'
import '../styles/kmodal.css'
import Ktable from "./Ktable";
import Card from "./Card";
import {Redirect} from "react-router-dom";
import {LoginContext} from "../App";
import Kinput from "./Kinput";
import axios, {AxiosResponse} from "axios";


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

function AdminPage(props: any) {
    const [loggedInUser, setLoggedInUser, isAdmin, setIsAdmin] = useContext(LoginContext);
    const [tab, setTab] = useState("products"); // products, categories, receipt,
    const [categoriesList, setCategoriesList]: any = useState([]);
    const newProductNameRef: any = useRef(null);
    const newProductCategoryRef: any = useRef(null);
    const newProductPriceRef: any = useRef(null);
    const newProductStockRef: any = useRef(null);
    const editProductNameRef: any = useRef(null);
    const editProductCategoryRef: any = useRef(null);
    const editProductPriceRef: any = useRef(null);
    const editProductStockRef: any = useRef(null);
    const newCategoryRef: any = useRef(null);
    const editCategoryRef: any = useRef(null);
    const [modalContent, setModalContent]: any = useState(undefined)
    const [cards, setCards]: any = useState([])
    const [receipts, setReceipts]: any = useState([])
    const [filteredReceipt, setFilteredReceipt] = useState([])
    const codeInputRef: any = useRef(null);
    const modalRef: any = useRef(null);
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
    const addProductHandler = (event: any) => {
        // event.preventDefault()
        console.log("making add product request")
        const _name = newProductNameRef.current.value
        const _cat = newProductCategoryRef.current.value
        const _price = newProductPriceRef.current.value
        const _stock = newProductStockRef.current.value
        axios.post('/api/admin/products/add', "", {
            params: {
                name: _name,
                price: _price,
                category: _cat,
                stock: _stock
            }
        }).then((response: AxiosResponse) => {
            console.log(response)
            requestForProducts()

            newProductNameRef.current.value = ""
            newProductCategoryRef.current.value = ""
            newProductPriceRef.current.value = ""
            newProductStockRef.current.value = ""
            closeModal()
        }).catch((response) => {
            console.log(response)
            closeModal()
        })
    }
    const editProductHandler = (product: any) => {
        console.log("making edit product request")
        const _name = editProductNameRef.current.value
        const _cat = editProductCategoryRef.current.value
        const _price = editProductPriceRef.current.value
        const _stock = editProductStockRef.current.value
        console.log(_name, _cat, _price, _stock)
        axios.post('/api/admin/products/modify', "", {
            params: {
                name: _name,
                price: _price,
                category: _cat,
                stock: _stock
            }
        }).then((response: AxiosResponse) => {
            console.log(response)
            requestForProducts()

            editProductNameRef.current.value = ""
            editProductCategoryRef.current.value = ""
            editProductPriceRef.current.value = ""
            editProductStockRef.current.value = ""
            closeModal()
        }).catch((response) => {
            console.log(response)
            closeModal()
        })
    }
    const deleteProductHandler = (product: any) => {
        const _name = editProductNameRef.current.value
        console.log("making delete product request")
        axios.post('/api/admin/products/delete', "", {
            params: {
                name: _name
            }
        }).then((response: AxiosResponse) => {
            console.log(response)
            requestForProducts()

            editProductNameRef.current.value = ""
            editProductCategoryRef.current.value = ""
            editProductPriceRef.current.value = ""
            editProductStockRef.current.value = ""
            closeModal()
        }).catch((response) => {
            console.log(response)
            closeModal()
        })
    }
    const deleteCategoryHandler = (event: any, catName: string) => {
        console.log("making delete category request", catName)
        event.preventDefault()
        axios.post('/api/admin/categories/delete', "", {
            params: {
                name: catName
            }
        }).then((response: AxiosResponse) => {
            console.log(response)
            requestForCategories()
            closeModal()
        }).catch((response) => {
            console.log(response)
            closeModal()
        })
    }
    const addCategoryHandler = () => {
        const _catName = newCategoryRef.current.value
        console.log("making add category request")
        axios.post('/api/admin/categories/add', "", {
            params: {
                name: _catName
            }
        }).then((response: AxiosResponse) => {
            console.log(response)
            requestForCategories()
            newCategoryRef.current.value = ""
            closeModal()
        }).catch((response) => {
            console.log(response)
            closeModal()
        })
    }
    const editCategoryHandler = (oldCatName: string) => {
        const _newCatName = editCategoryRef.current.value
        console.log("making edit category request")
        console.log("old: ", oldCatName, "new: ", _newCatName)
        axios.post('/api/admin/categories/modify', "", {
            params: {
                oldName: oldCatName,
                newName: _newCatName
            }
        }).then((response: AxiosResponse) => {
            console.log(response)
            requestForCategories()
            newCategoryRef.current.value = ""
            closeModal()
        }).catch((response) => {
            console.log(response)
            closeModal()
        })
    }
    useEffect(() => {
        requestForCategories()
        requestForProducts()
        requestForReceipts()
    }, [])
    const addProductModal = () => <div className="kmodal__content">
        <span className="kmodal__close-btn" onClick={closeModal}>&times;</span>
        <div className="kform">
            <div className="kform__row">
                <Kinput label="نام محصول" type="text" error={""} valid={0}
                        inputRef={newProductNameRef}
                        onChange={(e: any) => {
                            // setNewProductName(e.target.value)
                        }} login/>
            </div>
            <div className="kform__row">
                <Kinput label="قیمت محصول" type="number" error={""} valid={0}
                        inputRef={newProductPriceRef}
                        onChange={(e: any) => {
                            // setNewProductPrice(e.target.value)
                        }} style={{marginTop: 10}} login/>
            </div>
            <div className="kform__row">
                <Kinput label="دسته بندی" type="text" error={""} valid={0}
                        inputRef={newProductCategoryRef}
                        onChange={(e: any) => {
                            // setNewProductCategory(e.target.value)
                        }} style={{marginTop: 10}}
                        login/>
            </div>
            <div className="kform__row">
                <Kinput label="موجودی" type="number" error={""} valid={0}
                        inputRef={newProductStockRef}
                        onChange={(e: any) => {
                            // setNewProductStock(e.target.value)
                        }} style={{marginTop: 10}} login/>
            </div>

        </div>
        <button className="kform__btn" style={{marginTop: 10}} onClick={addProductHandler}>افزودن محصول</button>
    </div>

    const editProductModal = (product: any) => {
        setTimeout(() => {
            editProductNameRef.current.value = product.name
            editProductPriceRef.current.value = product.price
            editProductStockRef.current.value = product.stock
            editProductCategoryRef.current.value = product.category
        }, 0)
        return <div className="kmodal__content kform">
            <span className="kmodal__close-btn" onClick={closeModal}>&times;</span>
            <div className="kform">
                <div className="kform__row">
                    <Kinput label="نام محصول" type="text" error={""} valid={0}
                            inputRef={editProductNameRef}
                            disabled
                            login/>
                </div>
                <div className="kform__row">
                    <Kinput label="قیمت محصول" type="number" error={""} valid={0}
                            inputRef={editProductPriceRef}
                            style={{marginTop: 10}} login/>
                </div>
                <div className="kform__row">
                    <Kinput label="دسته بندی" type="text" error={""} valid={0}
                            inputRef={editProductCategoryRef}
                            style={{marginTop: 10}}
                            login/>
                </div>
                <div className="kform__row">
                    <Kinput label="موجودی" type="number" error={""} valid={0}
                            inputRef={editProductStockRef}
                            style={{marginTop: 10}} login/>
                </div>

            </div>
            <div className="kform__row">
                <button className="kform__btn kform__btn--danger" style={{marginTop: 10, width: 150}}
                        onClick={() => deleteProductHandler(product)}>حذف
                </button>
                <button className="kform__btn" style={{marginTop: 10, width: 150}}
                        onClick={() => editProductHandler(product)}>ویرایش
                </button>
            </div>

        </div>
    }
    const addCategoryModal = () => {
        return <div className="kmodal__content">
            <span className="kmodal__close-btn" onClick={closeModal}>&times;</span>
            <div className="kform">
                <div className="kform__row">
                    <Kinput label="دسته بندی" type="text" error={""} valid={0}
                            inputRef={newCategoryRef}
                            login/>
                </div>
            </div>
            <button className="kform__btn" style={{marginTop: 10, width: 100}} onClick={addCategoryHandler}>افزودن
            </button>
        </div>

    }
    const editCategoryModal = (catName: string) => {
        setTimeout(() => {
            editCategoryRef.current.value = catName
        }, 0)
        return <div className="kmodal__content">
            <span className="kmodal__close-btn" onClick={closeModal}>&times;</span>
            <div className="kform">
                <div className="kform__row">
                    <Kinput label="دسته بندی" type="text" error={""} valid={0}
                            inputRef={editCategoryRef}
                            login/>
                </div>
            </div>
            <button className="kform__btn" style={{marginTop: 10, width: 100}}
                    onClick={() => editCategoryHandler(catName)}>ویرایش
            </button>
        </div>
    }
    const requestForProducts = () => {
        axios.get('/api/products', {
            params: {
                minPrice: 0,
                maxPrice: 999999999,
                sort: 'price asc',
                name: ''
            }
        }).then((response: AxiosResponse) => {
            if (response.status === 200) {
                console.log("requesting for products")
                console.log(response.data)
                const newCards: any[] = []
                for (let i = 0; i < response.data.length; i++) {
                    let p = response.data[i]
                    newCards.push(<Card stock={p["stock"]} name={p["name"]} category={p["category"]} price={p["price"]}
                                        soldNumber={p["sold_number"]} editHandler={(product: any) => {
                        openModal()
                        setModalContent(() => editProductModal((product)))
                    }
                    } key={`admin-card${i}`}
                                        admin={isAdmin}/>)
                }
                setCards(() => newCards)

            }
        }).catch((response) => {
            console.log(response.data)
            closeModal()
        })
    }
    const requestForReceipts = () => {
        axios.get('/api/admin/receipt',).then((response: AxiosResponse) => {
            if (response.status === 200) {
                console.log("requesting for receipts")
                console.log(response.data)
                setReceipts(() => response.data)
            }
        }).catch((response) => {
            console.log(response.data)
            closeModal()
        })
    }
    const filterData = () => {
        if (codeInputRef.current === null || codeInputRef.current.value === ""){
            setFilteredReceipt(() => receipts)
            return;
        }
        const newData = receipts.filter((value: any, index: number) => {
            return value["tracing_code"].includes(codeInputRef.current.value);
        });
        setFilteredReceipt(() => newData);
    }
    useEffect(() => {
        filterData()
    }, [receipts])
    const requestForCategories = () => {
        axios.get('/api/categories').then((response: AxiosResponse) => {
            if (response.status === 200) {
                console.log("requesting for categories")
                console.log(response.data)
                const newCats: any[] = []
                for (let i = 0; i < response.data.length; i++) {
                    newCats.push(response.data[i])
                }
                setCategoriesList(() => newCats)
            }
        }).catch((response) => {
            console.log(response.data)
            closeModal()
        })
    }
    const makeCategories = () => {
        const catOpCell = (catName: string) => <div>
            <button className="admin-page__cat__btn admin-page__cat__edit" onClick={() => {
                setModalContent(() => editCategoryModal(catName))
                openModal()
            }}>ویرایش
            </button>
            <button className="admin-page__cat__btn admin-page__cat__remove" onClick={(event) => {
                deleteCategoryHandler(event, catName)
            }}>حذف
            </button>
        </div>
        return categoriesList.map((catString: string) => {
            return {
                name: catString,
                operation: catOpCell(catString)
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
                        <button className="admin-page__product__add" onClick={() => {
                            openModal()
                            setModalContent(() => addProductModal())
                        }}>افزودن محصول جدید
                        </button>
                        <div className="admin-page__cards">
                            {cards}
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
                            <button className="admin-page__cat__add" onClick={() => {
                                setModalContent(() => addCategoryModal())
                                openModal()
                            }
                            }>افزودن دسته بندی جدید
                            </button>
                            <Ktable data={makeCategories()} headers={{name: "نام دسته بندی", operation: "عملیات"}}/>
                        </div>
                        : ""
            }
            <div className="kmodal" ref={modalRef}>
                {modalContent}
            </div>
        </section>
    );
}

export default AdminPage;
