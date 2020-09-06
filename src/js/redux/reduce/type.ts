export type FilePath = {
    path:string,
    name:string
}

export type Watched = {
    document:FilePath,
    placed:FilePath,
    ext:{
        ai:boolean,
        pdf:boolean,
    },
    export:boolean,
    extFolder:FilePath
};

export type Mode = "watch"|"options";

export type PDFver = "ACROBAT4"|"ACROBAT5"|"ACROBAT6"|"ACROBAT7"|"ACROBAT8";

export type OptionType = {
    PDFver:PDFver,
    close:boolean,
}

