import * as React from "react";
import * as path from "path";
import * as fs from "fs";
import {useState,useMemo,useCallback} from "react";
import {mapStateToProps} from "../redux/actions/mapStateProps";
import {mapDispatchProps} from "../redux/actions/mapDispatchProps";
import {connect} from "react-redux";

import DropConnection from "./dropForm";
import {callPathDialog} from "../fileSystem/init";
import {Watched} from "../redux/reduce/type";
import {DocumentRadio} from "../parts/radioBox";
import {DocmentCheckBox} from "../parts/checkBox";
import {getFileName} from "../fileSystem/basic";

import WatchingPlate from "./watchingCover";


const DocumentForm = (props) =>{
    const [data,setData]:[Watched,(v:Watched)=>void] = useState(props.data);
    console.log(data);
    useMemo(()=>setData(props.data),[props]);
    const handleCheckBox = useCallback((e,arg)=>{
        const obj = {...data};
        obj.export = e.target.checked;
        props.set_WatchProp(obj,arg.index);
    },[data]);
    const handleRadioBox = useCallback((e,arg)=>{
        const obj = {...data};
        obj.ext[arg.prop === "ai" ? "pdf" : "ai"] = false;
        obj.ext[arg.prop] = e.target.checked;
        props.set_WatchProp(obj,arg.index);
    },[data]);

    const setPath = useCallback((e:React.MouseEvent,arg:{index:number,prop:string,type:string})=>{
        const obj = {...data};
        const f = decodeURI(callPathDialog(arg.type)());
        if(f===""||f===null||f===undefined||f==="undefined")return false;
        if(!validateExt(f,arg.type)){
            alert("please choice file properly");
            return false;
        }
        obj[arg.prop].path = f;
        obj[arg.prop].name = getFileName(f);
        props.set_WatchProp(obj,arg.index);
    },[data]);

    const receiveDropped = (file,arg:{index:number,prop:string,type:string}) =>{
        if(!validateExt(file.path,arg.type)){
            alert("please choice file properly");
            return false;
        }
        const obj = {...data};
        obj[arg.prop].path = file.path;
        obj[arg.prop].name = file.name;
        props.set_WatchProp(obj,arg.index);
    }

    const validateExt = (root:string,type:string) =>{
        console.log(path.extname(root));
        if(type==="document") return path.extname(root)===".ai"||path.extname(root)===".pdf";
        if(type==="folder"){
            const stat = fs.statSync(root);
            return stat.isDirectory();
        }
        return true;
    }
    return(
            <div className="rootForm">
                <WatchingPlate />
                <header className="rootForm__header">
                    <h3 className="head-small">document {props.index+1}</h3>
                </header>
                <div className="documentForm">
                    <DropConnection setDrop={receiveDropped} func={setPath} arg={{index:props.index,prop:"document",type:"document"}}root={{classType:"documentForm__doc",name:"document",path:data.document}}/>
                    <DropConnection setDrop={receiveDropped} func={setPath} arg={{index:props.index,prop:"placed",type:"image"}}root={{classType:"documentForm__placed",name:"placed item",path:data.placed}}/>
                    <ul>
                        <li><DocumentRadio func={handleRadioBox} arg={{index:props.index,prop:"ai"}} checked={data.ext.ai} name="ai"/></li>
                        <li><DocumentRadio func={handleRadioBox} arg={{index:props.index,prop:"pdf"}} checked={data.ext.pdf} name="pdf"/></li>
                    </ul>
                </div>
                <div className="exportForm">
                    <DocmentCheckBox func={handleCheckBox} name="export" checked={data.export} arg={{index:props.index,type:"image"}}/>
                    <DropConnection setDrop={receiveDropped} func={setPath} arg={{index:props.index,prop:"extFolder",type:"folder"}} root={{classType:"exportForm__path",name:"export path",path:data.extFolder}}/>
                </div>
            </div>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(DocumentForm);