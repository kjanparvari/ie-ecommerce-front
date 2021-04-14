import React from 'react';
import bag from '../img/bag.png'
import '../styles/Card.css'

function Card(props: any) {
    return (
        <div className="card">
            <img src={bag} className="img" alt=""/>
            <div className="name">موس گیمیگ ریزر</div>
            <div className="category">دسته بندی یک</div>
            <div className="buy-part">
                <button className="buy-btn">خرید محصول</button>
                <span className="price">{"10.000 تومان "}</span>
            </div>
        </div>
    );
}

export default Card;