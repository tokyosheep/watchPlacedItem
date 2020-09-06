import * as React from "react";
import {SelectBox} from "./type";

export const StdSelectBox = ({value,options,func,arg}:SelectBox<string,object>) =>{
    const selectList = options.map(op=><option className="selectBox-std__option" key={op}>{op}</option>);
    return(
        <div className="selectBox-std">
            <select className="selectBox-std__input" value={value} onChange={(e)=>func(e,arg)}>
                {selectList}
            </select>
            <div className="selectBox-std__plate">
                <div className="selectBox-std__arrow"></div>
            </div>
        </div>
    )
}