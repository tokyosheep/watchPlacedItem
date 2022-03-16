import { useState, useMemo } from 'react';
import * as chokidar from 'chokidar';
import { Document } from '../../../redux/features/documents/documentsSlice';
import { alertFromJSX } from '../../../fileSystem/init';
import { replaceDesktop } from '../../../fileSystem/basic';
import { showWindow } from '../../../redux/features/windowMode/windowSlice';
import { OptionsType } from '../../../redux/features/options/optionSlice';
import { useAppSelector, useAppDispatch } from '../../../redux/app/hooks';
import { SendHostScript } from '../../../fileSystem/connectHostScript';
import { resolveFilePath } from '../../../fileSystem/resolveFIlePath';

class WatchContainer {
  private docs:AIDocument[];
  private watcher:chokidar.FSWatcher|null;
  constructor (docs) {
    this.docs = docs;
    this.watcher = null;
  }

  beginWatch () {
    const targets = this.docs.map(doc => [...doc.targets]).flat();
    console.log(targets);
    this.watcher = chokidar.watch(targets, {
      persistent: true,
      ignoreInitial: true,
      depth: 1
    });
    this.watcher
      .on('ready', () => console.log('ready'))
      .on('change', async (watchedPath) => {
        console.log('change');
        console.log(watchedPath);
        this.watcher.unwatch(watchedPath);
        await Promise.allSettled(this.docs.map(async doc => {
          const hasTargets = await doc.lookFortarget(watchedPath);
          if (hasTargets) this.watcher.add(hasTargets);
        }));
      }).on('error', err => alertFromJSX(err).then());
    console.log(this.watcher);
  }

  stopWatch () {
    this.watcher.close();
  }
}

class AIDocument {
  public jsxProp: Omit<Document, 'images'>;
  public targets: string[];
  public originTargets: string[];
  public path: string;
  private toJsx:SendHostScript;
  private options:OptionsType;
  constructor (targets:string[], filePath:string, options:OptionsType, jsxProp:Omit<Document, 'images'>) {
    this.jsxProp = jsxProp;
    this.targets = targets;
    this.originTargets = targets;
    this.path = filePath;
    this.toJsx = new SendHostScript();
    this.options = options;
  }

  async lookFortarget (imgPath) {
    this.targets = this.targets.filter(target => target !== imgPath);
    console.log(this.targets);
    console.log(resolveFilePath(this.targets[0]));
    if (this.targets.length < 1) {
      // open and save
      const r = await this.toJsx.callHostScript({
        func: 'watch',
        doc: this.jsxProp,
        options: this.options
      });
      console.log(r);
      this.targets = [...this.originTargets];
      return this.targets;
    } else {
      return false;
    }
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
    const aiDocs:AIDocument[] = checkedDocs.map((doc, i) => {
      return new AIDocument(
        doc.images.filter(img => img.checked).map(img => replaceDesktop(img.path)),
        doc.path,
        options,
        { images: {}, ...doc }
      );
    });
    console.log(aiDocs);
    const watchContainer = new WatchContainer(aiDocs);
    watchContainer.beginWatch();
    setController(watchContainer);
    dispatch(showWindow('loading'));
  };

  const stopWatch = async () => {
    watchController.stopWatch();
    setController(null);
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
