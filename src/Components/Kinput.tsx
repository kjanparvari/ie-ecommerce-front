import React, {useEffect, useRef, useState} from 'react';
import '../styles/Kinput.css'

const Kinput = ({label, style, inputRef, disabled, type, left, right, big, onChange, error, valid}: any) => {

    const getRealType = () => {
        if (["email", "password", "text", "number"].includes(type))
            return type;
        return "text";
    }
    return (
        <div
            className={`kinput__container  ${left ? "kinput--left" : right ? "kinput--right" : ""}`}
            style={style}
        >
            <div className={`kinput ${valid === 1 ? "kinput--valid" : valid === -1 ? "kinput--not-valid" : ""}`}>
                <div className="kinput__label">{label}</div>
                {
                    !big ?
                        <input
                            className="kinput__input "
                            type={getRealType()}
                            minLength={type === "password" ? 6 : 0}
                            placeholder={`...لطفا ${label} را وارد کنید`}
                            min={getRealType() === "number" ? 0 : undefined}
                            disabled={disabled}
                            onChange={onChange}
                            // onFocus={validate}
                            // onBlur={() => setValid(0)}
                            ref={inputRef}
                        />
                        :
                        <textarea
                            name="address"
                            className="kinput__input kinput__input--big"
                            onChange={onChange}
                            disabled={disabled}
                            // onFocus={validate}
                            // onBlur={() => setValid(0)}
                            ref={inputRef}
                        />
                }
            </div>
            <div className="kinput__error">
                {valid === -1 ? error : ""}
            </div>


        </div>
    );
};

export default Kinput;