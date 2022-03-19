import fs from "fs";
import path from "path";
const csInterface = new CSInterface();
//const appID = csInterface.getApplicationID();
const extensionId = csInterface.getExtensionID();
const extFolder = csInterface.getSystemPath(SystemPath.EXTENSION);
const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;

const dir_home = process.env[process.platform == `win32` ? `USERPROFILE` : `HOME`];
const dir_desktop = path.join(dir_home, `Desktop`);//デスクトップパス
const jsxParts = `${extensionRoot}/jsxParts`;
const polyFillFolder = `${extensionRoot}/polyFill`;

const debug = false;

export const writeDebugData = obj =>{
    if(!debug)return;
    fs.writeFileSync(`${extensionRoot}/data.json`,JSON.stringify(obj));
}

const readDirFiles = (path) =>{
    return new Promise((resolve,reject)=>{
        fs.readdir(path,(err,files)=>{
            if(err)reject(err);
            resolve(files);
        })
    });
}

const loadJsx = async(jsxFolder) =>{
    const parts = await readDirFiles(jsxFolder).catch(e=>console.log(e));
    const jsxes = parts.filter(f => path.extname(f) === ".jsx");
    jsxes.forEach(jsx =>  csInterface.evalScript(`$.evalFile("${jsxFolder}/${jsx}")`));
}

const reload = () =>{
    csInterface.addEventListener("com.adobe.csxs.events.WindowVisibilityChanged",()=>{location.reload(true)},false);
}

const preventDragEvent = () =>{
    window.addEventListener(`drop`,prevent_dragnaddrop,false);
    
    window.addEventListener(`dragover`,prevent_dragnaddrop,false);
    
    function prevent_dragnaddrop(e){
        e.stopPropagation();
        e.preventDefault();
    }
}

const init = async() =>{
    reload();
    preventDragEvent();
    csInterface.evalScript(`$.evalFile("${extensionRoot}json2.js")`);//json2読み込み
    await loadJsx(jsxParts);
    //await loadJsx(polyFillFolder);
}

const openFolderDialog = () =>{
    const f = cep.fs.showOpenDialog(false,true,"open",dir_desktop);
    return f.data[0];
}

const callPathDialog = callType =>{/*callType folder or image */
    return callType === "folder" ? openFolderDialog : openImageDialog;
}

const alertFromJSX = msg => {
    return new Promise(resolve => {
        csInterface.evalScript(`$.evalFile(alert("${msg}"))`,() => {
            resolve();
        })
    })
};

export {csInterface,extensionId,extFolder,extensionRoot,init,reload,callPathDialog,alertFromJSX};