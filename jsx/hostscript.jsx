/*
#include "jsxParts/save.jsx";
var obj = {
    "watch": {
        "document": {
            "path": "/Users/kawanoshuji/Desktop/sampledata/shiftImageTest/test01/shift01.ai",
            "name": "shift01.ai"
        },
        "placed": {
            "path": "/Users/kawanoshuji/Desktop/sampledata/shiftImageTest/test01/cat.psd",
            "name": "cat.psd"
        },
        "ext": {
            "ai": false,
            "pdf": true
        },
        "export": false,
        "extFolder": {
            "path": "/Users/kawanoshuji/Desktop/test_images/",
            "name": "test_images"
        }
    },
    "option": {
        "PDFver": "ACROBAT5",
        "close": true
    }
}
hostScript(obj);
*/

function hostScript(obj){
    "use strinct";
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
    function validateExport(extFolder){
        var f = new Folder(extFolder);
        flag = f.exists;
        return flag ? f : false;
    }
}