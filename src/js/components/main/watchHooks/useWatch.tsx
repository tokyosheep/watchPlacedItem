import React, { useState } from 'react';
import * as chokidar from 'chokidar';
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks';
import { Document } from '../../../redux/features/documents/documentsSlice';
import { alertFromJSX } from '../../../fileSystem/init';

type CencoredImgs = {
    path:string,
    checked:boolean,
    ownersIndex:number[]
}

class WatchData {
    private watcher:chokidar.FSWatcher|null;
    constructor () {
      this.watcher = null;
    }

    launchtoWatch (options, imgPath) {
      this.watcher = chokidar.watch(imgPath, {
        persistent: true,
        ignoreInitial: true,
        depth: 0
      });

      this.watcher.on('ready', () => console.log('ready'))
        .on('change', (filePath, stats) => {
          console.log(stats);
          console.log(filePath);
        })
        .on('error', err => alertFromJSX(err));
    }
}

const useWatch = () => {
  const [targets, setTargets] = useState<Document[]>([]);
  const docs = useAppSelector(state => state.documents.value);

  const watchDocs = () => {
    const initTargets = docs.filter(doc => doc.checked === true);
    if (initTargets.length < 1) {
      alert("there's no checked document");
      return;
    }
    initTargets.forEach(t => {
      t.images = t.images.filter(img => img.checked === true).map(img => {
        return {
          name: img.name,
          path: img.path,
          checked: false,
          setCheck: function () {
            this.checked = true;
          }
        };
      });
    });
    setTargets(initTargets);
  }
}
