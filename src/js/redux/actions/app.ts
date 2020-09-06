import {Watched,Mode,OptionType,PDFver} from "../reduce/type";

export const SetWatched ={
    SetWatchedItems:(watched:Watched[])=>{
        return{watched:watched,type:"SETWATCHED"};
    },
    SetWatchProp:(obj:Watched,index:number)=>{
        return{obj:obj,index:index,type:"SETWATCHPROP"};
    }
}

export const SwitchMode ={
    SetMode:(mode:Mode)=>{
        return{mode:mode,type:"SWITCHMODE"};
    }
}

export const SetOptions = {
    SetOptions:(options:OptionType)=>{
        return{options:options,type:"SETOPTIONS"}
    },
    SetValue:(prop:string,value:PDFver|boolean)=>{
        return{prop:prop,value:value,type:"SETPROP"}
    }
}

export const SetWatch ={
    SetWatch:(watchFlag:boolean)=>{
        return{watchFlag:watchFlag,type:"SETWATCHFLAG"}
    }
}