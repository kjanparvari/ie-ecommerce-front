import React from 'react';
import bag from '../img/bag.png'
import '../styles/Card.css'

function Card({admin, name, category, stock, buyHandler, editHandler, soldNumber, price}: any) {
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
                        <button className="card__purchase-btn" onClick={() => editHandler({
                            name: name,
                            price: price,
                            stock: stock,
                            soldNumber: soldNumber,
                            category: category
                        })}>ویرایش محصول</button>
                        :
                        stock === 0 ?
                            <button className="card__purchase-btn  card__purchase-btn--disabled"
                                    disabled>ناموجود</button>
                            :
                            <button className="card__purchase-btn"
                                    onClick={() => buyHandler({
                                        name: name,
                                        price: price,
                                        stock: stock,
                                        soldNumber: soldNumber,
                                        category: category
                                    })}>خرید محصول</button>
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