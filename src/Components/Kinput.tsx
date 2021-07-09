import React from 'react';
import '../styles/Kinput.css'

function Kinput({label, style, type, left, right, big}: any) {
    return (
        <div
            className={`kinput__container ${left ? "kinput--left" : right ? "kinput--right" : ""}`}
            style={style}
        >
            <div className="kinput__label">{label}</div>
            {
                !big ?
                    <input
                        className={`kinput__input ${big ? "kinput__input--big" : ""}`}
                        type={type === undefined ? "text" : type}
                        minLength={type === "password" ? 6 : 0}
                        placeholder={`...لطفا ${label} را وارد کنید`}
                    />
                    :
                    <textarea
                        name="address"
                        className="kinput__input kinput__input--big"
                    />
            }

        </div>
    );
}

export default Kinput;