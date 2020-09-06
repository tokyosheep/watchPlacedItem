import * as React from "react";
import {useCallback,useState,useMemo} from "react";
import {mapStateToProps} from "../redux/actions/mapStateProps";
import {mapDispatchProps} from "../redux/actions/mapDispatchProps";
import {connect} from "react-redux";
import {WatchButtons,StdButton} from "../parts/button";
import {initWatch,WatchDataType} from "../fileSystem/watchSystem";

const MainButtonRange = (props) =>{
    console.log(props);
    const [WatchSwitch,setWatchSwitch]:[WatchDataType[],(v:WatchDataType[])=>void] = useState([]);
    const watchStart = () =>{
        const watchObjects = initWatch(props.state.WatchedTypes,props.state.Options);
        setWatchSwitch(watchObjects);
        props.set_WatchFlag(true);
        alert("watch start");
    };
    const watchStop = () =>{
        WatchSwitch.forEach(w=>w.stopWatch());
        setWatchSwitch([]);
        props.set_WatchFlag(false);
        alert("watchStop");
    };
    const shiftMode = useCallback(()=>props.switch_Mode("options"),[props.state.ModeSwitch]);
    const watchFlag = WatchSwitch.length < 1;
    return(
        <div className="ButtonRange">
            <ul>
                <li><WatchButtons name={watchFlag  ? "watch start" : "watch stop"} func={watchFlag  ? watchStart : watchStop}/></li>
                <li><StdButton name="option" func={shiftMode} disabled={!watchFlag}/></li>
            </ul>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(MainButtonRange);