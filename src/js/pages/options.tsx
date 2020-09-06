import * as React from "react";
import {useCallback,useState,useMemo} from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import {StdSelectBox} from "../parts/select";
import {StdCheckBox} from "../parts/checkBox";
import {StdButton} from "../parts/button";
import {PDFver,OptionType} from "../redux/reduce/type";

import {mapStateToProps} from "../redux/actions/mapStateProps";
import {mapDispatchProps} from "../redux/actions/mapDispatchProps";
import {connect} from "react-redux";


const OptionsForm = (props) =>{
    const pdfOptions:PDFver[] = ["ACROBAT4","ACROBAT5","ACROBAT6","ACROBAT7","ACROBAT8"];
    const [options,setOptions]:[OptionType,(v:OptionType)=>void] = useState(props.state.Options);
    useMemo(()=>setOptions(props.state.Options),[props]);
    const handleCheckBox = useCallback((e)=>props.set_Value("close",e.target.checked),[options]);
    const handleSelctBox = useCallback((e)=>props.set_Value("PDFver",e.target.value),[options]);
    const shiftMode = useCallback(()=>props.switch_Mode("watch"),[options]);
    return(
        <div className="optionsForm">
            <Header/>
            <main className="optionsMain">
                <ul>
                    <li>
                        <StdSelectBox value={options.PDFver} options={pdfOptions} func={handleSelctBox}/>
                    </li>
                    <li>
                        <StdCheckBox name="close document" checked={options.close} func={handleCheckBox}/>
                    </li>
                    <li>
                        <StdButton name="watch mode" func={shiftMode} />
                    </li>
                </ul>
            </main>
            <Footer/>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchProps)(OptionsForm);