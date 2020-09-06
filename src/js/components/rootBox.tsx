import * as React from "react";

const RootBox = ({root,point}:{root:string,point:{x:number,y:number}}) =>{
    const position = {
        left:point.x+"px",
        top:point.y+"px"
    }
    return(
        <div className="rootBox" style={position}>
            <span className="rootBox__root">
                {root}
            </span>
        </div>
    )
}

export default RootBox;