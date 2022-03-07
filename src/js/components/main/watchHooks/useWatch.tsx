import { useState, useMemo } from 'react';
import * as chokidar from 'chokidar';
import { Document } from '../../../redux/features/documents/documentsSlice';
import { alertFromJSX } from '../../../fileSystem/init';
import { replaceDesktop } from '../../../fileSystem/basic';
import { showWindow } from '../../../redux/features/windowMode/windowSlice';
import { OptionsType } from '../../../redux/features/options/optionSlice';
import { useAppSelector, useAppDispatch } from '../../../redux/app/hooks';
import { SendHostScript } from '../../../fileSystem/connectHostScript';

type TargetDoc = Omit<Document, 'images'>& {
    originalImages:string[],
    targetImages:string[]
};

type TargetImg = {
    path:string,
    parentPaths:string[]
}

class WatchData {
    private watcher:chokidar.FSWatcher|null;
    constructor (private filePath:string) {
      this.watcher = null;
      this.filePath = filePath;
    }

    watchBegin (func:(filePath:string, mySelf:WatchContainer)=>void, itSelf:WatchContainer) {
      this.watcher = chokidar.watch(this.filePath, {
        persistent: true,
        ignoreInitial: true,
        depth: 0
      });

      this.watcher
        .on('ready', () => console.log('ready'))
        .on('change', async (watchedPath) => {
          await this.stopWatch();
          await func(watchedPath, itSelf);
        })
        .on('error', err => alertFromJSX(err).then());
      console.log(this.watcher);
    }

    async stopWatch ():Promise<void> {
      if (this.watcher === null) return;
      await this.watcher.close();
      console.log('stop');
    }
}

class WatchContainer {
    private watchObjects:WatchData[];
    private toJsx:SendHostScript;
    private options:OptionsType;
    public originalTargetImgs:TargetImg[];
    constructor (public targetDocs:TargetDoc[], public targetImgs:TargetImg[], options:OptionsType) {
      this.targetDocs = targetDocs;
      /**
       * original targetImgs @type {TargetDoc[]}
       * after updated all of targetimgs, it restores targetimgs array to targetimgs
       */
      this.originalTargetImgs = targetImgs;
      this.targetImgs = targetImgs;
      this.toJsx = new SendHostScript();
      this.options = options;
    }

    /**
     * @param doc
     * @type {TargetDoc}
     * check whether all images updated or not
     * if updated , it'll update pdf or ai file
     */
    async isAllChecked (doc:TargetDoc) {
      if (this.targetImgs.length < 1) {
        // open and save
        const r = await this.toJsx.callHostScript({
          func: 'watch',
          doc,
          options: this.options
        });
        console.log(r);
        /**
         * restore target images
         */
        this.targetImgs = [...this.originalTargetImgs];
        this.targetImgs.forEach(img => {
          const watch = new WatchData(img.path);
          watch.watchBegin(this.checkedImg, this);
          this.watchObjects.push(watch);
        });
      }
    }

    async checkedImg (imgPath, mySelf:WatchContainer) {
      console.log('checked');
      Promise.allSettled(mySelf.targetImgs.map(async (img) => {
        if (img.path === imgPath) {
          for (let i = 0; i < mySelf.targetDocs.length; i++) {
            const doc = mySelf.targetDocs[i];
            console.log(img.parentPaths);
            if (img.parentPaths.some(parent => parent === doc.path)) {
              mySelf.targetImgs = mySelf.targetImgs.filter(targetImg => targetImg.path !== imgPath);
              console.log(mySelf.targetImgs);
              await mySelf.isAllChecked(doc);
            }
          }
        }
      }));
      console.log(mySelf.targetDocs);
    }

    watchAllImages () {
      /**
       * create @type {WatchContainer} instances
       */
      this.watchObjects = this.targetImgs.map(img => new WatchData(img.path));
      /**
       * dispatch watchBegin mathod
       */
      this.watchObjects.forEach(obj => obj.watchBegin(this.checkedImg, this));
    }

    async stopWatchAllImags () {
      await Promise.allSettled(this.watchObjects.map(async (obj) => {
        await obj.stopWatch();
      }));
    }
}

/* hooks */

const useWatch = () => {
  const dispatch = useAppDispatch();
  const windows = useAppSelector(state => state.windows.value);
  const options = useAppSelector(state => state.options.value);
  const [watchController, setController] = useState<WatchContainer|null>(null);
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
      const newimages = doc.images.map(img => replaceDesktop(img.path));
      return { ...data, targetImages: newimages, originalImages: newimages };
    });
    console.log(targets);
    /**
     * @type {PlacedImage} ->
     * @type {TargetImg}
     */
    const images:TargetImg[] = checkedDocs.reduce((acc, current) => {
      const r = current.images.filter(img => img.checked === true);
      const imgs = r.filter(img => {
        const index = acc.findIndex(a => a.path === img.path);
        if (index === -1) return true;
        /**
         * if array has already same image, push to parent path to parent property
         */
        acc[index].parentPaths.push(img.path);
        return false;
      });
      return [...acc, ...imgs.map(img => ({ path: replaceDesktop(img.path), parentPaths: [current.path] }))];
    }, []);
    console.log(images);
    const watchContainer = new WatchContainer(targets, images, options);
    watchContainer.watchAllImages();
    setController(watchContainer);
    dispatch(showWindow('loading'));
  };

  const stopWatch = async () => {
    await watchController.stopWatchAllImags();
  }

  useMemo(() => {
    if (!windows.loading && watchController !== null) {
      (async () => {
        await stopWatch();
      })();
    }
  }, [windows]);

  return { launchWatch };
};

export default useWatch;
