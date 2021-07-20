import React, {useEffect, useState, useRef, createRef} from 'react';
import '../styles/HomePage.css'
import KcheckBox from "./KcheckBox"
import clockImg from "../img/hero_header/clock.png"
import ps5Img from "../img/hero_header/ps5-controller.png"
import smartphonesImg from "../img/hero_header/smartphones.png"
import Card from "./Card";
import {AiFillLeftCircle, AiFillRightCircle} from 'react-icons/ai'
import Slider from '@material-ui/core/Slider';
import {log} from "util";
import axios, {AxiosError} from 'axios'

const heroImages = [clockImg, ps5Img, smartphonesImg]
const HomePage = (props: any) => {
    const [heroImg, setHeroImg] = useState(clockImg);
    const [timerFlag, setTimerFlag] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCapacity, setPageCapacity] = useState(15);
    const [checkBoxes, setCheckBoxes]: any[] = useState([])
    const [sortType, setSortType] = useState("best-selling") // best-selling, price-low, price-high
    const [allCards, setAllCards]: any[] = useState([])
    const [catRefs, setCatRefs]: any[] = useState([])
    const [sliderValue, setSliderValue] = React.useState<number[]>([20, 37]);

    const handleSliderChange = (event: any, newValue: number | number[]) => {
        setSliderValue(newValue as number[]);
    };

    const requestForProducts = () => {
        let categories: string = ""
        for (let i = 0; i < catRefs.length; i++) {
            if (catRefs[i].ref.current.value) {
                categories += "&category=" + catRefs[i].name
            }
        }
        const [minPrice, maxPrice] = sliderValue
        console.log(`minPrice: ${minPrice}, maxPrice: ${maxPrice}`)
        axios.get("/api/products?sort=" + sortType + "&minPrice=" + minPrice.toString() + "&maxPrice=" + maxPrice.toString() + "&name=" + categories).then((response: any) => {
            const newProducts: any[] = []
            for (let i = 0; i < response.data.length; i++) {
                const {Name, Category, StockNumber, Price}: any = response.data[i]
                newProducts.push(<Card key={`card${i}`} name={Name} category={Category} stockNumber={StockNumber}
                                       price={Price}/>)
            }
            setAllCards(() => newProducts)
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
    const generateShowingCards = () => {
        const _start = (pageNumber - 1) * pageCapacity;
        let _end: number;
        if (isLastPage())
            _end = allCards.length;
        else
            _end = _start + pageCapacity;
        return allCards.slice(_start, _end);
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
    // useEffect(() => {
    // for (let i = 0; i < 100; i++)
    //     allCards.push(<Card key={`card${i}`}/>)
    // }, [])
    let newCheckBoxes: any[]
    let refs: any[]
    useEffect(() => {
        axios.get("/api/categories/all").then((response: any) => {
            newCheckBoxes = []
            refs = []
            for (let i = 0; i < response.data.length; i++) {
                const _ref = createRef()
                refs.push({
                    name: response.data[i],
                    ref: _ref
                })
                newCheckBoxes.push(<KcheckBox ref={_ref} onChange={requestForProducts} className="categories__option" id={i}
                                              name={response.data[i]}/>)
            }
            setCatRefs(() => refs)
            setCheckBoxes(() => newCheckBoxes)
        })
    }, [])
    useEffect(() => {
        requestForProducts()
    }, [sliderValue.toString()])
    return (
        <section className="home-page">
            <section className="hero-header">
                <div className="hero-header__title">
                    ... در محصولات سایت جست و جو کنید
                </div>
                <input type="text" placeholder="...نام محصول خود را وارد کنید" className="hero-header__search-box"/>
                <button onClick={() => requestForProducts()} className="hero-header__search-btn">
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
                    <button className={`sort-btn ${sortType === "best-selling" ? "sort-btn--chosen" : ""}`}
                            onClick={() => setSortType(() => "soldNumber desc")}>
                        بیشترین فروش
                    </button>
                    <button className={`sort-btn ${sortType === "price-high" ? "sort-btn--chosen" : ""}`}
                            onClick={() => setSortType(() => "price desc")}>
                        گران ترین
                    </button>
                    <button className={`sort-btn ${sortType === "price-low" ? "sort-btn--chosen" : ""}`}
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
                        {generateShowingCards()}
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
        </section>
    );
}

export default HomePage;