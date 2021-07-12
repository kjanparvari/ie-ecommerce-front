import React from 'react';
import bag from '../img/bag.png'
import '../styles/Card.css'

function Card({admin}: any) {
    return (
        <div className="card">
            {
                admin ?
                    <div className="card__badge">12</div>
                    : ""
            }

            <img src={bag} className="card__img" alt=""/>
            <div className="card__name">موس گیمیگ ریزر</div>
            <div className="card__category">دسته بندی یک</div>
            <div className="card__purchase-part">
                {
                    admin ?
                        <button className="card__purchase-btn">ویرایش محصول</button>
                        :
                        <button className="card__purchase-btn">خرید محصول</button>
                }

                <div className="card__price">
                    <span>تومان</span>
                    <span>10.000 </span>
                </div>
            </div>

        </div>
    );
}

export default Card;