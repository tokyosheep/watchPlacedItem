import React, { useState } from 'react';
import * as chokidar from 'chokidar';
import { useAppSelector } from '../../../redux/app/hooks';
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
  const [targetImgs, setTargetImgs] = useState<CencoredImgs[]>([]);
  const docs = useAppSelector(state => state.documents.value);

  const dispatchChange = imgPath => {
    const checkedTargets = targets.map(doc => {
      const imgs = doc.images.map(img => {
        const flag = img.path === imgPath ? true : img.checked;
        return { ...img, checked: flag };
      });
      return { ...doc, images: imgs };
    });
    const finished = checkedTargets.filter(ta => ta.images.every(img => img.checked === true));
    if (finished.length >= 1) {
      // func something
      
    }
  }

  const watchDocs = () => {
    const initTargets = docs.filter(doc => doc.checked === true);
    if (initTargets.length < 1) {
      alert("there's no checked document");
      return;
    }
    initTargets.forEach(t => {
      t.images = t.images.filter(img => img.checked === true).map(img => ({ path: img.path, name: img.name, checked: false }));
    });
    setTargets(initTargets);

  }
}
