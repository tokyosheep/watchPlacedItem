function updataTimeStamp(){
    var layers = app.activeDocument.layers;
    for(var i=0;i<layers.length;i++){
        if(layers[i].name === "timeStamp000"){
            replaceDate(layers[i].pageItems);
        }
    }
    function replaceDate(items){
        var dObj = new Date();//create date object
        var m = dObj.getMonth() + 1;
        var d = dObj.getDate();
        var h = dObj.getHours();
        var minute = dObj.getMinutes();
        var contents = m + "月 " + d + "日 " + h +"時 " + minute + "分";
        for(var n=0;n<items.length;n++){
            try{
                items[n].contents = contents;
            }catch(e){
                continue;
            }
        }
    }
}