import React, { useState } from 'react';
import * as chokidar from 'chokidar';
import { useAppSelector } from '../../../redux/app/hooks';
import { Document } from '../../../redux/features/documents/documentsSlice';
import { alertFromJSX } from '../../../fileSystem/init';

class WatchData {
    private watcher:chokidar.FSWatcher|null;
    constructor () {
      this.watcher = null;
    }

    watchBegin (filePath) {
      this.watcher = chokidar.watch(filePath, {
        persistent: true,
        ignoreInitial: true,
        depth: 0
      });

      this.watcher
        .on('ready', () => console.log('ready'))
        .on('change', async (watchedPath, stats) => {
          console.log(watchedPath);
          console.log(stats);
          await this.stopWatch();
        })
        .on('error', err => alertFromJSX(err));
    }

    async stopWatch():Promise<void> {
      await this.watcher.close();
      console.log('stop');
    }
}

type TargetDoc = Omit<Document, 'images'>& {imageCount:number};

type TargetImg = {
    path:string,
    parentPaths:string[]
}

const useWatch = () => {
  const [targetDocs, setTargetDocs] = useState<TargetDoc[]>([]);
  const [targetImgs, setTargetImgs] = useState<TargetImg[]>([]);
  // const docs = useAppSelector(state => state.documents.value);
  const launchWatch:(docs:Document[])=>void = docs => {
    const checkedDocs = docs.filter(doc => doc.checked === true);
    /* filtered checked documents */
    if (checkedDocs.length < 1) return;
    /**
     * turned
     * @type {Document} into ->
     * @type {TargetDoc}
     * added imageount
     */
    const targets = checkedDocs.map((doc, i) => {
      const { images, ...data } = doc;
      return { ...data, imageCount: images.length };
    });
    console.log(targets);
    setTargetDocs(targets);

    /**
     * @type {PlacedImage} ->
     * @type {TargetImg}
     */
    const images:TargetImg[] = checkedDocs.reduce((acc, current) => {
      const imgs = current.images.filter(img => img.checked === true).filter(img => {
        const index = acc.findIndex(a => a.path === img.path);
        if (index === -1) return true;
        acc[index].parentPaths.push(img.path);
        return false;
      });
      return [...acc, ...imgs.map(img => ({ path: img.path, parentPath: current.path }))];
    }, []);
    console.log(images);
    setTargetImgs(images);
  }
  return { launchWatch };
}

export default useWatch;
