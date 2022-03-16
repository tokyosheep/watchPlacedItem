import path from 'path';

const isWin = process.platform === 'win32';

export const resolveFilePath = filePath => isWin ? path.normalize(filePath) : filePath;