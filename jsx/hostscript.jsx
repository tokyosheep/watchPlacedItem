/*
#include "jsxParts/save.jsx";
*/

/*
    {
        func: string,
        documents: {
            name:string,
            path:string,
            exportPath:string,
            checked:boolean,
            isExport:boolean,
            format:Format,
            images:PlacedImage[]
        }, 
        options{
            pdfver: string
            close: boolean
        }
    }
*/

function getSaveMethod(doc,options){
    if(doc.format === 'PDF'){
        saveAIdata(doc.isExport ? doc.exportPath + '/' + app.activeDocument.name : null);
    }else{
        saveAIdata(options.pdfver doc.isExport ? doc.exportPath + '/' + app.activeDocument.name : null);
    }
}

function openDoc(doc){
    try{
        var f = new File(doc);
        app.open(f);
        return true;
    }catch(e){
        alert(e);
        return false;
    }
}

function openDocs(obj){
    var docs = obj.documents;
    var options = obj.options;
    for(var i=0;i<docs.length;i++){
        if(!openDoc(docs[i].path))continue;
        try{
            getSaveMethod(docs[i],options);
        }catch(e){
            alert(e);
            continue;
        }
    }
}



function hostScript(obj){
    "use strinct";
    switch(obj.func){
        case 'open':
        openDocs(obj);
        break;

        case 'watch':
        break;

        default:
        return false;
    }
    return true;
    /*
    var watch = obj.watch;
    var option = obj.option;
    if(!openDoc(watch.document.path)){
        alert("the document path is invalid");
        return false;
    }
    if(watch.export){
        var folderObj = validateExport(watch.extFolder.path);
        if(!folderObj){
            alert("the folder path is invalid");
            return false;
        }
        if(!getSaveMethod(watch.ext,folderObj+"/"+activeDocument.name,option.PDFver))return false;;
    }else{
        if(!getSaveMethod(watch.ext,app.activeDocument.fullName,option.PDFver))return false;;
    }
    if(option.close)activeDocument.close(SaveOptions.DONOTSAVECHANGES);

    
    function validateExport(extFolder){
        var f = new Folder(extFolder);
        flag = f.exists;
        return flag ? f : false;
    }
    */
}