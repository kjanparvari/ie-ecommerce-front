import React, {useEffect, useRef, useState} from 'react';
import '../styles/Kinput.css'

const Kinput = ({label, style, type, left, right, big, validation, login}: any) => {
    const inputRef = useRef(null)
    const [error, setError] = useState("");
    const [valid, setValid] = useState(0); // 1: valid, -1: not valid, 0: not set yet
    useEffect(() => {
            if (validation === undefined)
                return
            if (type === "password" && login) {
                validation[type] = validateLoginPassword
                return
            }
            validation[type] = validate;
        }
        ,
        []
    )
    const validate = () => {
        // @ts-ignore
        let value: string = inputRef.current.value;
        if (type !== "password")
            value = value.trim()
        // check if its not empty
        if (value === "") {
            setError(() => `${label} نمی تواند خالی باشد `);
            setValid(-1);
            return undefined;
        }
        if (type === "email") {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(value).toLowerCase())) {
                setError(() => "فرمت ایمیل معتبر نیست");
                setValid(-1);
                return undefined;
            }
        }
        if (type === "password") {
            if (value.length < 8) {
                setError(() => "طول رمز عبور باید حداقل 8 باشد")
                setValid(-1)
                return undefined;
            } else if (value.search(/[a-zA-Z]/) == -1 || value.search(/\d/) == -1) {
                setError(() => "رمز عبور باید شامل حروف و عدد باشد")
                setValid(-1)
                return undefined;
            }
        }
        if (type !== "address") {
            if (value.length > 255) {
                setError(() => `اندازه ${label} نمی تواند بیشتر از 255 کاراکتر باشد`)
                setValid(-1)
                return;
            }
        }
        if (type === "address") {
            if (value.length > 1000) {
                setError(() => "اندازه آدرس نمی تواند بیشتر از 1000 کاراکتر باشد")
                setValid(-1)
                return undefined;
            }
        }
        setError(() => "");
        setValid(1);
        return value;
    }
    const validateLoginPassword = () => {
        // @ts-ignore
        let value: string = inputRef.current.value;
        if (value.length < 8) {
            setError(() => "طول رمز عبور باید حداقل 8 باشد")
            setValid(-1)
            return undefined;
        }
        setError(() => "");
        setValid(1);
        return value;
    }
    const getRealType = () => {
        if (["email", "password", "text"].includes(type))
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
                            onChange={validate}
                            // onFocus={validate}
                            // onBlur={() => setValid(0)}
                            ref={inputRef}
                        />
                        :
                        <textarea
                            name="address"
                            className="kinput__input kinput__input--big"
                            onChange={validate}
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