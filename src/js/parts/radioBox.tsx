import * as React from "react";
import {CheckBox} from "./type";

export const StdRadioBox = ({name,checked,func,arg}:CheckBox<React.ChangeEvent>) =>(
    <label className="radiobox-std">
        <input type="radio" className="radiobox-std__input" checked={checked} name={name} onChange={(e)=>func(e,arg)}/>
        <div className="radiobox-std__display"></div>
    </label>
)

export const DocumentRadio = ({name,checked,func,arg}:CheckBox<React.ChangeEvent>) =>(
    <label className="radiobox-doc">
        <input type="radio" className="radiobox-doc__input" checked={checked} onChange={(e)=>func(e,arg)}/>
        <div className="radiobox-doc__display">
            <div className="radiobox-doc__ball"></div>
        </div>
        <span className="radiobox-doc__name">{name}</span>
    </label>
)