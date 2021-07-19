import React, {useEffect} from 'react';
import '../styles/KcheckBox.css'

function KcheckBox({className, ref, style, id, name}: any) {
    useEffect(()=>{
        console.log(`checkBox:${id}`);
    }, [])
    return (
        <div className={className} style={style}>
            <div className="round-checkbox__container">
                <div className="round-checkbox">
                    <input type="checkbox" ref={ref} id={`checkbox-input${id}`} key={`checkbox${id}`}/>
                    <label htmlFor={`checkbox-input${id}`}/>
                </div>
                <div className="round-checkbox__title">{name}</div>
            </div>

        </div>
    );
}

export default KcheckBox;