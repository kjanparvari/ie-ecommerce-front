import React from 'react';
import bag from '../img/bag.png'
import '../styles/Card.css'

function Card({admin, name, category, stock, soldNumber, price}: any) {
    return (
        <div className="card">
            {
                admin ?
                    <div className="card__badge">{stock}</div>
                    : ""
            }

            <img src={bag} className="card__img" alt=""/>
            <div className="card__name">{name}</div>
            <div className="card__category">{category + (admin ? ` - فروخته: ${soldNumber}` : "")}</div>
            <div className="card__purchase-part">
                {
                    admin ?
                        <button className="card__purchase-btn">ویرایش محصول</button>
                        :
                        <button className="card__purchase-btn">خرید محصول</button>
                }

                <div className="card__price">
                    <span>{" تومان "}</span>
                    <span>{price}</span>
                </div>
            </div>

        </div>
    );
}

export default Card;