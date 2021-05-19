import React from 'react';
import '../styles/Finput.css'

function Finput({label, style, type, left, right, big}: any) {
    return (
        <div
            className={`finput__container ${left ? "finput--left" : right ? "finput--right" : ""}`}
            style={style}
        >
            <div className="finput__label">{label}</div>
            {
                !big ?
                    <input
                        className={`finput__input ${big ? "finput__input--big" : ""}`}
                        type={type === undefined ? "text" : type}
                        minLength={type === "password" ? 6 : 0}
                        placeholder={`...لطفا ${label} را وارد کنید`}
                    />
                    :
                    <textarea
                        name="address"
                        className="finput__input finput__input--big"
                    />
            }

        </div>
    );
}

export default Finput;