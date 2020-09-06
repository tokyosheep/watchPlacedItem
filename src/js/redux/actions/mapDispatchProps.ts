import {SetWatched,SwitchMode,SetOptions,SetWatch} from "./app";
import {Watched,Mode,OptionType,PDFver} from "../reduce/type";

export const mapDispatchProps = dispatch =>{
    return{
        set_Watched:(watched:Watched[])=>dispatch(SetWatched.SetWatchedItems(watched)),
        set_WatchProp:(obj:Watched,index:number)=>dispatch(SetWatched.SetWatchProp(obj,index)),
        switch_Mode:(mode:Mode)=>dispatch(SwitchMode.SetMode(mode)),
        set_Options:(options:OptionType)=>dispatch(SetOptions.SetOptions(options)),
        set_Value:(prop:string,value:PDFver|boolean)=>dispatch(SetOptions.SetValue(prop,value)),
        set_WatchFlag:(watch:boolean)=>dispatch(SetWatch.SetWatch(watch))
    };
}