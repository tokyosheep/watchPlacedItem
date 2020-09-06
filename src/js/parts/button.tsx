import * as React from "react";
import {Button} from "./type";

export const StdButton = ({name,func,arg,disabled}:Button) =>(
    <button className="button-std" onClick={()=>func(arg)} disabled={disabled}>{name}</button>
)

export const WatchButtons = ({name,func,arg,disabled=false}:Button) =>(
    <button className="button-watch" onClick={()=>func(arg)} disabled={disabled}>{name}</button>
)