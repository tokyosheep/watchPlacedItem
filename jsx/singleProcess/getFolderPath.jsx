(function(){
    var folder = Folder.selectDialog("select folder");
    if (folder){
        return decodeURI(folder.toString());
    }
    return "";
})();