
function getSaveMethod(ext,path,ver){
    if(ext.ai)return saveAIdata(path);
    if(ext.pdf)return savePDF(ver,path);
    return false;
}
function saveAIdata(path){
    try{
        path = path || app.activeDocument.fullName;
        var saveOptions = new IllustratorSaveOptions();
        saveOptions.embedICCProfile = true;//profile埋め込み
        var savePath = new File(path);
        activeDocument.saveAs(savePath,saveOptions);
        return true;
    }catch(e){
        alert("the file hasn't saved yet");
        return false;
    }
    
}
function savePDF(ver,path){
    try{
        path = path || app.activeDocument.fullName;
        var savePath = new File(path);
        var option = new PDFSaveOptions();
        var acrobat = getPDFVer(ver);
        if(!acrobat)throw Error("It can't recognize PDF version");
        option.compatibility = acrobat;
        activeDocument.saveAs(savePath,option);
        return true;
    }catch(e){
        alert(e);
        return false;
    }
}
function getPDFVer(value){
    switch(value){
        case "ACROBAT4":
            return PDFCompatibility.ACROBAT4;
        case "ACROBAT5":
            return PDFCompatibility.ACROBAT5;
        case "ACROBAT6":
            return PDFCompatibility.ACROBAT6;
        case "ACROBAT7":
            return PDFCompatibility.ACROBAT7;
        case "ACROBAT8":
            return PDFCompatibility.ACROBAT8;
        default:
            return false;
    }
}
