export type CheckBox<C> = {
    checked:boolean,
    arg?:object,
    name:string,
    func:(e:C,arg?:object)=>void,
}

export type Button = {
    arg?:object,
    func:(arg?)=>void,
    name:string,
    disabled?:boolean
}

export type SelectBox<T,O> = {
    value:T,
    options:T[],
    arg?:O,
    func:(e:React.ChangeEvent,arg?:O)=>void,
}