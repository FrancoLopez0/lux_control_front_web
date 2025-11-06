export interface DisplayParamProps{
    value:number | undefined
    label:string
    size?:"small" | "default"
    setValue?:(val:number) => void
}