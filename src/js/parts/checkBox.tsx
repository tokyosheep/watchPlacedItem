import * as React from "react";
import {CheckBox} from "./type";

export const StdCheckBox = ({checked,name,func,arg}:CheckBox<React.ChangeEvent>) =>(
    <div className="checkboxRange">
        <span>{name}</span>
        <label className="checkbox-std">
            <input type="checkbox" className="checkbox-std__input" name={name} checked={checked} onChange={(e)=>func(e,arg)}/>
            <div className="checkbox-std__display"></div>
            <div className="checkbox-std__cover"></div>
            <span className="checkbox-std__text">{checked ? "ON" : "OFF"}</span>
        </label>
    </div>
);

export const DocmentCheckBox = ({checked,name,func,arg}:CheckBox<React.ChangeEvent>) =>(
    <label className="checkbox-doc">
        <input type="checkbox" className="checkbox-doc__input" name={name} checked={checked} onChange={(e)=>func(e,arg)}/>
        <div className="checkbox-doc__display">
            <div className="checkbox-doc__square"></div>
        </div>
        <span className="checkbox-doc__name">{name}</span>
    </label>
);