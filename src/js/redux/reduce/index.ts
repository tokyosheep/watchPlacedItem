import {Watched,Mode,OptionType} from "./type";
export type propsType = {
    WatchedTypes:Watched,
    ModeSwitch:Mode,
    Options:OptionType
}

const initialWatched:Watched[] = [
    {
        document:{
            path:"nothing",
            name:"nothing"
        },
        placed:{
            path:"nothing",
            name:"nothing"
        },
        ext:{
            ai:true,
            pdf:false
        },
        export:false,
        extFolder:{
            path:"nothing",
            name:"nothing"
        },
    },
    {
        document:{
            path:"nothing",
            name:"nothing"
        },
        placed:{
            path:"nothing",
            name:"nothing"
        },
        ext:{
            ai:true,
            pdf:false
        },
        export:false,
        extFolder:{
            path:"nothing",
            name:"nothing"
        },
    },
    {
        document:{
            path:"nothing",
            name:"nothing"
        },
        placed:{
            path:"nothing",
            name:"nothing"
        },
        ext:{
            ai:true,
            pdf:false,
        },
        export:false,
        extFolder:{
            path:"nothing",
            name:"nothing"
        },
    }
];

export const WatchedTypes = (state=initialWatched,action) =>{
    switch(action.type){
        case"SETWATCHED":
            const watched = {...action.watched};
            return watched;

        case"SETWATCHPROP":
            const stat = [...state];
            stat[action.index] = action.obj;
            return stat;

        default:
            return state;
    }

}

export const ModeSwitch = (state:Mode="watch",action) =>{
    switch(action.type){
        case"SWITCHMODE":
            return action.mode;

        default:
            return state;
    
    }
}


const initOptions:OptionType = {
    PDFver:"ACROBAT7",
    close:true
}

export const Options = (state=initOptions,action) =>{
    switch(action.type){
        case"SETOPTIONS":
            return action.options;

        case"SETPROP":
            const stat = {...state};
            stat[action.prop] = action.value;
            return stat;

        default:
            return state;
    }
}

export const watchFlag = (state=false,action)=>{
    switch(action.type){
        case"SETWATCHFLAG":
            return action.watchFlag;

        default:
            return state;
    }
}