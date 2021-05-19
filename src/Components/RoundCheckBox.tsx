import React from 'react';
import '../styles/RoundCheckBox.css'

function RoundCheckBox({className, style, id}: any) {
    return (
        <div className={className} style={style}>
            <div className={"finput__container"}>
                <div className="round-checkbox">
                    <input type="checkbox" id={`checkbox ${id}`}/>
                    <label htmlFor={`checkbox ${id}`}/>
                </div>
                <div>دسته بندی یک</div>
            </div>

        </div>
    );
}

export default RoundCheckBox;