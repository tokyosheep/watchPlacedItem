const path = require("path");
    const dir_home = process.env[process.platform == `win32` ? `USERPROFILE` : `HOME`];
    const dir_desktop = path.join(dir_home, `Desktop`);//デスクトップパス

    console.log(dir_desktop);