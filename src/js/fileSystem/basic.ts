import path from 'path';
import fs from 'fs';
import { alertFromJSX } from './init';
const dirHome = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
const dirDesktop = path.join(dirHome, 'Desktop');

export const getFileName = (root:string) => {
  const f = path.basename(root);
  return f;
};

export const getFolderName = (root:string) => {
  return path.dirname(root);
};

export const replaceDesktop:(filePath:string)=>string = filePath => filePath.replace(/^~\/Desktop/, dirDesktop);

export const isDirectory:(filePath:string)=>Promise<boolean> = async (filePath) => {
  const stat = await fs.promises.stat(filePath);
  if (!stat.isDirectory()) {
    await alertFromJSX('drop the folder');
    return false;
  } else {
    return true;
  }
}
