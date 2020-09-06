window.onload = () =>{
    "use strict";
    const path = require("path");
    const dir_home = process.env[process.platform == `win32` ? `USERPROFILE` : `HOME`];
    const dir_desktop = path.join(dir_home, `Desktop`);//デスクトップパス
    const csInterface = new CSInterface();
    const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;
    
    const getFolder = () =>{
        const f = cep.fs.showOpenDialog(false,true,`open`,dir_desktop,[`jpg`]);
        console.log(f);
    }
    document.getElementById("btn_test").addEventListener("click",getFolder);

    const getFromJsx = () =>{
        csInterface.evalScript(`$.evalFile("${extensionRoot}getFolderPath.jsx")`,(e)=>{
            console.log(e);
        });
    }
    document.getElementById("fromJsx").addEventListener("click",getFromJsx);
}