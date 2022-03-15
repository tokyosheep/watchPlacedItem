
/*
 #include "./jsxParts/save.jsx";
 #include "./jsxParts/updateTimeStamp.jsx";
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
/*
var obj = {
    "documents": [
        {
            "name": "Cat02.ai",
            "path": "~/Desktop/テスト/Cat02.ai",
            "checked": true,
            "images": [
                {
                    "name": "cat_patternA.psd",
                    "path": "~/Desktop/テスト/image02/cat_patternA.psd",
                    "checked": false
                }
            ],
            "exportPath": "",
            "isExport": false,
            "format": "PDF"
        }
    ],
    "func": "open",
    "options": {
        "pdfver": "ACROBAT7",
        "isClose": true,
        "timeStamp": false
    }
}

hostScript(obj);
*/

function turnNodePathIntoJSXPath(nodePath){
    try{
        var f = new File(nodePath);
        return f.fullName;
    }catch(e){
        alert(e);
        return false;
    }
}

function hostScript(obj){
    "use strict";
    switch(obj.func){
        case 'open':
        openDocs(obj);
        break;

        case 'watch':
        detected(obj);
        break;

        case 'getJSXPath':
        return turnNodePathIntoJSXPath(obj.nodePath);

        default:
        return false;
    }
    return true;
}

function getSaveMethod(doc,options){
    if(options.timeStamp)updataTimeStamp();
    if(doc.format !== 'PDF'){
        saveAIdata(doc.isExport ? doc.exportPath + '/' + app.activeDocument.name : null);
    }else{
        savePDF(options.pdfver, doc.isExport ? doc.exportPath + '/' + app.activeDocument.name : null);
    }
    if(options.isClose)activeDocument.close(SaveOptions.DONOTSAVECHANGES);
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

/*
    type Document = {
        name: string;
        path: string;
        exportPath: string;
        checked: boolean;
        isExport: boolean;
        format: Format;
        images: PlacedImage[];
    }
*/

function detected(obj){
    var doc = obj.doc;
    var options = obj.options;
    if(!openDoc(doc.path))return;
    getSaveMethod(doc,options);
}
