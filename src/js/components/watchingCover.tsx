import * as React from "react";
import {mapStateToProps} from "../redux/actions/mapStateProps";
import {mapDispatchProps} from "../redux/actions/mapDispatchProps";
import {connect} from "react-redux";

const WatchingPlate = (props) =>{
    console.log(props);
    return(
        <div className={"watching" + (props.state.watchFlag ? "" : " none")}>
            <span className="watching__title">watching</span>
            <div className="watching__circle">
                <div className="watching__eye">
                    <div className="watching__blackEye"></div>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(WatchingPlate);