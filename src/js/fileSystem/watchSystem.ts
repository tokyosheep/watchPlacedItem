import * as chokidar from "chokidar";
import * as fs from "fs";
import * as path from "path";
import {extensionRoot} from "../fileSystem/init";
import {SendHostScript,HostObj} from "./connectHostScript";
import {Watched,OptionType} from "../redux/reduce/type";
import {alertFromJSX} from "../fileSystem/init";

export interface WatchDataType {
    watchOption:{watch:Watched,option:OptionType},
    action:HostObj,
    launchToWatch:()=>void,
    stopWatch:()=>void
}


class WatchData implements WatchDataType{
    private watcher:chokidar.FSWatcher|null;
    constructor(
        public watchOption:{watch:Watched,option:OptionType},
        public action:HostObj
    ){
        this.watcher = null;
        this.watchOption = watchOption;
        this.action = action;
    }

    launchToWatch(){
        this.watcher = chokidar.watch(this.watchOption.watch.placed.path,{
            persistent:true,
            ignoreInitial:true,//開始当初のフォルダーは反応させない
            depth:0//0にしないと再帰的にファイルをチェックするっぽい
        });

        this.watcher
        .on("ready",()=>console.log("ready"))
        .on("change",async(path,stats)=>{
            console.log(stats);
            console.log(path);
            //fs.writeFileSync(`${extensionRoot}data.json`,JSON.stringify(obj));
            const flag = await this.action.callHostScript(this.watchOption);
        })
        .on("error",err=>alertFromJSX(err));
        /*
        .on("unlink",path=>{
            console.log(path);
            alertFromJSX("watched file renamed or removed!");
        });
        */
    }

    async stopWatch():Promise<void>{
        await this.watcher.close();
        console.log("stop");
    }

}

export const initWatch = (watches:Watched[],option:OptionType) =>{
    console.log(watches);
    const watchObjects = watches.map(watch=>{
        const action = new SendHostScript();
        return new WatchData({watch:watch,option:option},action);
    });
    watchObjects.forEach(w=>w.launchToWatch());
    return watchObjects;
}