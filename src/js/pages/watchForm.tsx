import * as React from "react";
import {useState,useMemo} from "react";
import {mapStateToProps} from "../redux/actions/mapStateProps";
import {mapDispatchProps} from "../redux/actions/mapDispatchProps";
import {connect} from "react-redux";
import {Watched} from "../redux/reduce/type";
import DocumentForm from "../components/documentForm";
import MainButtonRange from "../components/buttonRange";
import Header from "../components/header";
import Footer from "../components/footer";
const WatchForm = (props) =>{
    const [types,setTypes]:[Watched[],(v:Watched[])=>void] = useState(props.state.WatchedTypes);
    useMemo(()=>setTypes(props.state.WatchedTypes),[props]);
    const docForms = types.map((obj,index)=><li key={index}><DocumentForm data={obj} index={index}/></li>); 
    return(
        <div className="watchForm">
            <Header />
            <ul className="documentList">
                {docForms}
            </ul>
            <MainButtonRange />
            <Footer />
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(WatchForm);