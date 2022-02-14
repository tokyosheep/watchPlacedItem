import path from 'path';
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
