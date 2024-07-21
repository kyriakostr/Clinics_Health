import { useContext } from "react"
import { Context } from "./Contexts"

export const useFileContext = ()=>{
    const context = useContext(Context)
    if(!context){
        throw Error('context error');
    }

    return context

}