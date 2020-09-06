import * as React from "react";
import RootBox from "./rootBox";
import {useCallback,useRef,useState} from "react";
import {mapStateToProps} from "../redux/actions/mapStateProps";
import {mapDispatchProps} from "../redux/actions/mapDispatchProps";
import {connect} from "react-redux";
import {FilePath} from "../redux/reduce/type";
import {DndProvider,DropTargetMonitor,useDrop} from "react-dnd";
import {HTML5Backend, NativeTypes} from "react-dnd-html5-backend";


type RootType = {
    name:string,
    path:FilePath,
    classType:string
}

const RootForm = (props) =>{
    const { onDrop } = props;
    const [{canDrop,isOver},drop] = useDrop({
        accept:[NativeTypes.FILE],
        drop(item,monitor){
            console.log(item);
            console.log(monitor);
            if(onDrop){
                onDrop(props,monitor);
            }
        },
        collect:(monitor)=>({
            isOver:monitor.isOver(),
            canDrop:monitor.canDrop()
        })
    });
    type position = {x:number,y:number};
    const [point,setPoint]:[position,(v:position)=>void] = useState({x:0,y:0});
    const handleMousePosition = (e)=>{
        const rect = e.currentTarget.getBoundingClientRect();
        setPoint({x:e.clientX+15-rect.left,y:e.clientY-15-rect.top});
    };
    const isActive = canDrop && isOver;
    const root:RootType = props.root;
    return(
        <div ref={drop} className={"dropForm " + (isActive ? "dropOver" : "")} onClick={(e)=>props.func(e,props.arg)} onMouseOver={(e)=>handleMousePosition(e)}>
            <RootBox root={root.path.path} point={point}/>
            <p>{root.name}</p>
            <span>{root.path.name}</span>
        </div>
    )
}


const DropConnection = (props) =>{
    const handleFileDrop = useCallback((item,monitor:DropTargetMonitor)=>{
        console.log(item);
        console.log(monitor);
        if(monitor){
            const dropped = monitor.getItem().files;
            console.log(dropped);
            props.setDrop(dropped[0],props.arg);
        }
    },[props]);
    return(
        <DndProvider backend={HTML5Backend}>
            <RootForm func={props.func} arg={props.arg} root={props.root} onDrop={handleFileDrop}/>
        </DndProvider>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(DropConnection);
