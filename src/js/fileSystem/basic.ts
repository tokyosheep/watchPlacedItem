import * as path from 'path';
import * as fs from 'fs';

export const getFileName = (root:string) => {
  const f = path.basename(root);
  return f;
};

export const getFolderName = (root:string) => {
  return path.dirname(root);
};
