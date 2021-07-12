import React, {useEffect, useRef, useState} from 'react';
import '../styles/HomePage.css'
import {RangeSlider, InputNumber, InputGroup} from 'rsuite';
// import 'rsuite/dist/styles/rsuite-default.css'
import KcheckBox from "./KcheckBox"
import clockImg from "../img/hero_header/clock.png"
import laptopImg from "../img/hero_header/laptop.png"
import ps5Img from "../img/hero_header/ps5-controller.png"
import smartphonesImg from "../img/hero_header/smartphones.png"
import Card from "./Card";
import {AiFillLeftCircle, AiFillRightCircle} from 'react-icons/ai'

const heroImages = [clockImg, ps5Img, smartphonesImg]
const HomePage = (props: any) => {
    const [value, setValue] = useState([10, 50]);
    const [heroImg, setHeroImg] = useState(clockImg);
    const [timerFlag, setTimerFlag] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCapacity, setPageCapacity] = useState(15);
    const allCards: any[] = []
    const checkBoxes: any[] = [];
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
        console.log(`all: ${allCards.length}, cap: ${pageCapacity}, res: ${numberOfPages}`)
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
    for (let i = 0; i < 100; i++)
        allCards.push(<Card key={`card${i}`}/>)
    for (let i = 0; i < 5; i++)
        checkBoxes.push(<KcheckBox className="categories__option" key={`checkBox${i}`}/>)
    // }, [])

    // @ts-ignore
    return (
        <section className="home-page">
            <section className="hero-header">
                <div className="hero-header__title">
                    ... در محصولات سایت جست و جو کنید
                </div>
                <input type="text" placeholder="...نام محصول خود را وارد کنید" className="hero-header__search-box"/>
                <button onClick={() => alert("clicked!")} className="hero-header__search-btn">
                    جست و جو کنید
                </button>
                <div className="hero-header__slider-btn">
                    <AiFillLeftCircle className="hero-header__slider__left-btn" onClick={prevHeroImg}/>
                    <AiFillRightCircle className="hero-header__slider__right-btn" onClick={nextHeroImg}/>
                </div>
                <img src={heroImg} className="hero-header__img" alt=""/>

            </section>
            <section className="products-section">
                <div className="sort-box">
                    <span className="sort-msg">: مرتب سازی بر اساس</span>
                    <button className="sort-btn sort-btn--chosen   ">بیشترین فروش</button>
                    <button className="sort-btn">قیمت</button>
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
                                <RangeSlider
                                    progress
                                    className="price-slider"
                                    defaultValue={[10, 50]}
                                />
                                <InputGroup>
                                    <InputNumber
                                        min={0}
                                        max={100}
                                        value={value[0]}
                                        onChange={nextValue => {
                                            nextValue = parseFloat(nextValue.toString());
                                            const [start, end] = value;
                                            if (nextValue > end) {
                                                return;
                                            }
                                            setValue([nextValue, end]);
                                        }}
                                    />
                                    <InputGroup.Addon>to</InputGroup.Addon>
                                    <InputNumber
                                        min={0}
                                        max={100}
                                        value={value[1]}
                                        onChange={nextValue => {
                                            nextValue = parseFloat(nextValue.toString());
                                            const [start, end] = value;
                                            if (start > nextValue) {
                                                return;
                                            }
                                            setValue([start, nextValue]);
                                        }}
                                    />
                                </InputGroup>
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