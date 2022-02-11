(function(){
    /*
    export type PlacedImage = {
        name:string,
        path:string,
        checked:false
    };

    export type Document = {
        name:string,
        path:string,
        checked:false,
        images:PlacedImage[]
    };
    */
    if(app.activeDocument === undefined)return false;
    var activeDoc = app.activeDocument;
    if(app.activeDocument.placedItems.length < 1){
        alert("active document doesn't have any placed item");
        return false;
    }
    var doc = { 
        name:decodeURI(activeDoc.name),
        path:decodeURI(activeDoc.fullName),
        checked:false,
        images: [] 
    };
    for(var i=0;i<activeDoc.placedItems.length;i++){
        try{
            doc.images.push({
                name:decodeURI(activeDoc.placedItems[i].file.name.toString()),
                path:decodeURI(activeDoc.placedItems[i].file.toString()),
                checked:false
            });
        }catch(e){
            alert(e);
            continue;
        }
    }
    return JSON.stringify(doc);
})();