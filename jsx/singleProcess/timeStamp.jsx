(function(){
    var doc = app.activeDocument;
    doc.rulerOrigin = [0, doc.height];//set the origin point on top left of artBoard
    var point = 2.83465;
    var fontSize = 6 * point;
    var newLayer = activeDocument.layers.add();//add layer
    newLayer.name = "timeStamp000";//set layer name
    if(app.activeDocument.selection.length < 1){
        alert("check cut item");
        return false;
    }
    function stampTimeCode(select){
        var dObj = new Date();//create date object
        var m = dObj.getMonth() + 1;
        var d = dObj.getDate();
        var h = dObj.getHours();
        var minute = dObj.getMinutes();
        var textObj = activeDocument.textFrames.add();
        textObj.contents = m + "月 " + d + "日 " + h +"時 " + minute + "分";
        textObj.paragraphs[0].size = fontSize; // 64pt 

        textObj.left = (select.width) - textObj.width + select.left -10;
        textObj.top = select.top + fontSize +(20 * point);
    }    
    for(var i=0;i<app.activeDocument.selection.length;i++){
        stampTimeCode(app.activeDocument.selection[i]);
    }
    return true;
})();