import React, {useEffect, useState, useRef, createRef} from 'react';
import '../styles/HomePage.css'
import KcheckBox from "./KcheckBox"
import clockImg from "../img/hero_header/clock.png"
import ps5Img from "../img/hero_header/ps5-controller.png"
import smartphonesImg from "../img/hero_header/smartphones.png"
import Card from "./Card";
import {AiFillLeftCircle, AiFillRightCircle} from 'react-icons/ai'
import Slider from '@material-ui/core/Slider';
import axios, {AxiosError} from 'axios'
import Kinput from "./Kinput";

const heroImages = [clockImg, ps5Img, smartphonesImg]
const HomePage = (props: any) => {
    const [heroImg, setHeroImg] = useState(clockImg);
    const [timerFlag, setTimerFlag] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCapacity, setPageCapacity] = useState(15);
    const [checkBoxes, setCheckBoxes]: any[] = useState([])
    const [sortType, setSortType] = useState("sold_number desc") // sold_numberDesc, price asc, price desc
    const [allCards, setAllCards]: any[] = useState([])
    const [showingCards, setShowingCards]: any[] = useState([])
    const [catRefs, setCatRefs]: any[] = useState([])
    const [sliderValue, setSliderValue] = React.useState<number[]>([0, 1000]);
    const [reqFlag, setReqFlag] = useState(true)
    const modalRef: any = useRef(null);
    const buyAmountRef: any = useRef(null);
    const [modalContent, setModalContent]: any = useState("")
    const openModal = () => {
        //@ts-ignore
        modalRef.current.style.display = "flex"
    }
    const closeModal = () => {
        //@ts-ignore
        modalRef.current.style.display = "none"
    }
    const handleSliderChange = (event: any, newValue: number | number[]) => {
        setSliderValue(newValue as number[]);
        setReqFlag(true)
    };
    useEffect(() => {
        console.log("catrefs change")
        console.log(catRefs)
    }, [catRefs.length])
    const requestForProducts = () => {
        const [minPrice, maxPrice] = sliderValue
        const params = new URLSearchParams();
        params.append("sort", sortType);
        params.append("maxPrice", maxPrice.toString());
        params.append("minPrice", minPrice.toString());
        params.append("name", "");
        // let _cats: any[] = []
        console.log("requesting for products")
        // console.log(catRefs)
        for (let i = 0; i < catRefs.length; i++) {
            if (catRefs[i].inputRef.current.checked) {
                // console.log("cat", catRefs[i].name, catRefs[i].inputRef.current.checked)
                // _cats.push(catRefs[i].name)
                params.append("category", catRefs[i].name)
            }
        }
        console.log("param: ")
        console.log(params)
        axios.get("/api/products", {params: params}).then((response: any) => {
            const newProducts: any[] = []
            for (let i = 0; i < response.data.length; i++) {
                const {name, category, stock, sold_number, price}: any = response.data[i]
                newProducts.push(<Card key={`card${i}`} name={name} category={category} stockNumber={stock}
                                       price={price} buyHandler={(product: any) => {
                    setModalContent(() => <div className="kmodal__content">
                        <span className="kmodal__close-btn" onClick={closeModal}>&times;</span>
                        <div className="kform">
                            <div className="kform__row">
                                <Kinput label="تعداد" type="number" error={""} valid={0}
                                        inputRef={buyAmountRef}
                                        login/>
                            </div>
                        </div>
                        <button className="kform__btn kform__btn--success" style={{marginTop: 10, width: 100}}
                                onClick={() => buyProductHandler(product)}>خرید
                        </button>
                    </div>)
                    setTimeout(openModal, 0);
                }}/>)
            }
            console.log("new products:")
            console.log(newProducts)
            setAllCards(() => newProducts)
        })
    }
    const requestForCategories = () => {
        console.log("requesting for categories")
        axios.get("/api/categories").then((response: any) => {
            newCheckBoxes = []
            refs = []
            for (let i = 0; i < response.data.length; i++) {
                const _ref = createRef()
                refs.push({
                    name: response.data[i],
                    inputRef: _ref
                })
                newCheckBoxes.push(<KcheckBox inputRef={_ref} onChange={() => setReqFlag(true)} key={i}
                                              className="categories__option"
                                              id={i} name={response.data[i]}/>)
            }
            console.log(refs.length)
            console.log(newCheckBoxes.length)
            setCatRefs(() => refs)
            setCheckBoxes(() => newCheckBoxes)
        })
    }
    const nextHeroImg = () => {
        const current_index = heroImages.indexOf(heroImg);
        if (current_index === heroImages.length - 1) {
            setHeroImg(heroImages[0]);
            return;
        } else {
            setHeroImg(heroImages[current_index + 1]);
            return;
        }
    }
    const prevHeroImg = () => {
        const current_index = heroImages.indexOf(heroImg);
        if (current_index === 0) {
            setHeroImg(heroImages[heroImages.length - 1]);
            return;
        } else {
            setHeroImg(heroImages[current_index - 1]);
            return;
        }
    }
    const generatePageNumbers = () => {
        const numberOfPages = Math.ceil(allCards.length / pageCapacity);
        // console.log(`all: ${allCards.length}, cap: ${pageCapacity}, res: ${numberOfPages}`)
        const pageNumberList: any[] = []
        let _start: number, _end: number
        if (pageNumber <= 3)
            _start = 1
        else
            _start = pageNumber - 2
        if (pageNumber >= Math.ceil(allCards.length / pageCapacity) - 2)
            _end = Math.ceil(allCards.length / pageCapacity)
        else
            _end = pageNumber + 2
        for (let i = _start; i <= _end; i++) {
            if (i == pageNumber) {
                pageNumberList.push(
                    <div
                        key={`pageIcon${i}`}
                        className="pagination__number pagination__number--chosen"
                        onClick={() => setPageNumber(i)}
                    >
                        {i}
                    </div>)
            } else {
                pageNumberList.push(
                    <div
                        key={`pageIcon${i}`}
                        className="pagination__number"
                        onClick={() => setPageNumber(i)}
                    >
                        {i}
                    </div>)
            }
        }
        return pageNumberList
    }
    const isLastPage = () => {
        return pageNumber === Math.ceil(allCards.length / pageCapacity);
    }
    const isFirstPage = () => {
        return pageNumber === 1;
    }
    const nextPage = () => {
        if (!isLastPage())
            setPageNumber((prevState => prevState + 1))
    }
    const prevPage = () => {
        if (!isFirstPage())
            setPageNumber((prevState => prevState - 1))
    }
    useEffect(() => {
        setTimeout(() => {
            nextHeroImg();
            setTimerFlag(() => !timerFlag);
        }, 10000)
    }, [timerFlag])
    let newCheckBoxes: any[]
    let refs: any[]
    useEffect(() => {
        window.onclick = (event: MouseEvent) => {
            if (event.target == modalRef.current)
                closeModal();
        }
        requestForCategories()
    }, [])
    useEffect(() => {
        if (reqFlag) {
            console.log("req flag is on")
            requestForProducts()
            setPageNumber(1);
            setReqFlag(false)
        }
    }, [reqFlag])
    useEffect(() => {
        console.log("changing showing cards")
        const _start = (pageNumber - 1) * pageCapacity;
        let _end: number;
        if (isLastPage())
            _end = allCards.length;
        else
            _end = _start + pageCapacity;
        setShowingCards(() => allCards.slice(_start, _end));
    }, [JSON.stringify(allCards), pageCapacity, pageNumber]);
    // useEffect(() => {
    //     console.log("sort type changed")
    //     console.log(sortType)
    //     setReqFlag(true)
    // }, [sortType])
    const buyProductHandler = (product: any) => {
        axios.get("/api/buy", {
            params: {
                name: product.name,
                number: buyAmountRef.current.value
            }
        }).then((response: any) => {
            setReqFlag(true)
            closeModal()
        }).catch((response: any) => {
            console.log(response)
            closeModal()
        })
    }

    return (
        <section className="home-page">
            <section className="hero-header">
                <div className="hero-header__title">
                    ... در محصولات سایت جست و جو کنید
                </div>
                <input type="text" placeholder="...نام محصول خود را وارد کنید" className="hero-header__search-box"/>
                <button onClick={() => setReqFlag(true)} className="hero-header__search-btn">
                    جست و جو کنید
                </button>
                <div className="hero-header__slider-btn">
                    <AiFillLeftCircle className="hero-header__slider__left-btn" onClick={prevHeroImg}/>
                    <AiFillRightCircle className="hero-header__slider__right-btn" onClick={nextHeroImg}/>
                </div>
                <img src={heroImg} className="hero-header__img" alt=""/>

            </section>
            <section id="products-section" className="products-section">
                <div className="sort-box">
                    <span className="sort-msg">: مرتب سازی بر اساس</span>
                    <button className={`sort-btn ${sortType === "sold_number desc" ? "sort-btn--chosen" : ""}`}
                            onClick={() => setSortType(() => "sold_number desc")}>
                        بیشترین فروش
                    </button>
                    <button className={`sort-btn ${sortType === "price desc" ? "sort-btn--chosen" : ""}`}
                            onClick={() => setSortType(() => "price desc")}>
                        گران ترین
                    </button>
                    <button className={`sort-btn ${sortType === "price asc" ? "sort-btn--chosen" : ""}`}
                            onClick={() => setSortType(() => "price asc")}>
                        ارزان ترین
                    </button>
                </div>
                <div className="products-panel">
                    <div className="filters">
                        <div className="filters__box">
                            <div className="filters__title">دسته بندی ها</div>
                            <form className="categories__form">
                                {checkBoxes}
                            </form>

                        </div>
                        <div className="filters__box">
                            <div className="filters__title">تنظیم قیمت کالا</div>
                            <div className="price-number-range">
                                <div className="price-slider">
                                    <div className="price-slider__title">
                                        بازه قیمت محصولات
                                    </div>
                                    <Slider
                                        value={sliderValue}
                                        onChange={handleSliderChange}
                                        // color={"primary"}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="range-slider"
                                        max={1000}
                                    />
                                    <div className="price-slider__description">
                                        {`از ${sliderValue[0]} تا ${sliderValue[1]}`}
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="products">
                        {showingCards}
                    </div>

                </div>

            </section>
            <section className="pagination__box">
                <div className="pagination">
                    <button className={`pagination__btn ${isLastPage() ? "pagination__btn--disabled" : ""}`}
                            onClick={nextPage} disabled={isLastPage()}>
                        بعدی
                    </button>
                    <div className="pagination__numbers-group">
                        {generatePageNumbers()}
                    </div>
                    <button className={`pagination__btn ${isFirstPage() ? "pagination__btn--disabled" : ""}`}
                            onClick={prevPage} disabled={isFirstPage()}>
                        قبلی
                    </button>
                </div>

                <div className="pagination__capacity">
                    <label htmlFor="capacity-select" className="pagination__capacity__label">تعداد محصولات در
                        صفحه</label>
                    <select name="capacity-select" className="pagination__capacity__select" defaultValue={15}
                            onChange={(event) => setPageCapacity(parseInt(event.target.value))}
                    >
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>

            </section>
            <div className="kmodal" ref={modalRef}>
                {modalContent}
            </div>
        </section>
    );
}

export default HomePage;