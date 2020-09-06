import * as React from "react";
import {useMemo} from "react";
import WatchForm from "./watchForm";
import OptionsForm from "./options";
import {reload,init} from "../fileSystem/init";

import {mapStateToProps} from "../redux/actions/mapStateProps";
import {mapDispatchProps} from "../redux/actions/mapDispatchProps";
import {connect} from "react-redux";

const MainForm = (props) =>{
    useMemo(()=>{
        reload(); 
        init();
    },[]);
    const getMode = () =>{
        switch(props.state.ModeSwitch){
            case"watch":
                return <WatchForm />;

            case"options":
                return <OptionsForm />;

            default:
                return <WatchForm />;
        }
    }
    return(
        <>
            {getMode()}
        </>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(MainForm);