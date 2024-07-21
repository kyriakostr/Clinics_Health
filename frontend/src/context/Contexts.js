import { createContext, useReducer } from "react"


export const Context = createContext();

export const fileReducer = (state,action)=>{
    // console.log('Reducer Action:', action);
    switch(action.type)
    {
        case 'CLINICS':
            return  {
                ...state,
                clinics:action.payload

            }
        
        case 'USERS':
            return  {
                ...state,
                users:action.payload

            }
       
        case 'HEALTHRECORDS':
            return  {
                ...state,
                healthrecords:action.payload

                    }
        
        default:
            return state

    }

}


export const Provider = ({children}) =>{

    const [state,dispatch] = useReducer(fileReducer,
        {
        clinics:null,
        users:null,
        healthrecords:null
        }
    )
    // console.log('Provider State:', state);
  
    return(
        <Context.Provider value={{...state , dispatch}}>
        {children}
        </Context.Provider>
    )

}