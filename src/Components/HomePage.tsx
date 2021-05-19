import React, {useState} from 'react';
import '../styles/HomePage.css'
import {RangeSlider, InputNumber, InputGroup} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'
// import 'rsuite/dist/styles/rsuite-default-rtl.css'
import RoundCheckBox from "./RoundCheckBox";
import clockImg from "../img/clock.png"
import Card from "./Card";

const HomePage = (props: any) => {
    const [value, setValue] = useState([10, 50]);
    const checkBoxes = []
    for (let i = 0; i<5; i++){
        checkBoxes.push(<RoundCheckBox className="categories__option" id={i}/>)
    }
    return (
        <section className="home-page">
            <section className="search-section">
                <div className="search-title">
                    ... در محصولات سایت جست و جو کنید
                </div>
                <input type="text" placeholder="...نام محصول خود را وارد کنید" className="search-box"/>
                <button onClick={() => alert("clicked!")} className="search-btn">
                    جست و جو کنید
                </button>
                <img src={clockImg} className="clock-img" alt=""/>

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
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                    </div>

                </div>

            </section>

        </section>
    );
}

export default HomePage;