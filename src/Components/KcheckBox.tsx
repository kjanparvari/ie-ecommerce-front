import React from 'react';
import '../styles/KcheckBox.css'

function KcheckBox({className, style, id}: any) {
    return (
        <div className={className} style={style}>
            <div className="round-checkbox__container">
                <div className="round-checkbox">
                    <input type="checkbox" id={`checkbox ${id}`}/>
                    <label htmlFor={`checkbox ${id}`}/>
                </div>
                <div className="round-checkbox__title">دسته بندی یک</div>
            </div>

        </div>
    );
}

export default KcheckBox;