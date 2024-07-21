import { useEffect, useState } from "react";
import { useFileContext } from "../context/useContext";
import { formatDateForInput } from "../function/dateformat";
import "./modal.css"

const CreateGeneralHealthRecord = ({ show, onClose}) => {


    const {dispatch } =useFileContext()
    const [description,setDescription]=useState('')
    const [date,setDate] = useState('')
    const [userId,setUserId] = useState(null)
    const [users,setUsers]=useState([])
    const [username,setUserName]=useState('')
    const [usersuggestion,setUserSuggestion]=useState([])

    const setsuggestions = (name)=>{
        
        const suggestions = users.filter((user)=>{
            if(name!=''){
               return String(user.name).toLocaleLowerCase().startsWith(String(name).toLocaleLowerCase())
            }
        })
        setUserSuggestion(suggestions)

    }
    const getusers = async()=>{
        try {
            const response = await fetch(`http://localhost:4000/users`)
            const json = await response.json()
            if(response.ok){
               
                setUsers(json)
            }
        } catch (error) {
            console.log(error)
        }
    }

    
    
    useEffect(() => {
        getusers()
      }, [users]);

    const body = {
      description,date,userId
    }
    if (!show) {
      return null;
    }
    
    const editmethod = async() =>{
        
          try {
            const response = await fetch(`http://localhost:4000/health-records`,{
                method:'POST',
                body:JSON.stringify(body),
                headers:{'Content-Type':'application/json'}
            })
            const json = await response.json()
            if(response.ok){
              dispatch({type:'HEALTHRECORDS',payload:json})
              onClose()
            }
        } catch (error) {
            console.log(error)
        }
       
    }
    return ( 
        <div className="overlay" >
        <div className="dialog">
          <h2>Alert</h2>
          <input type="text"
            value={description } 
            onChange={(e)=>setDescription(e.target.value)}/>
            <br />
          <input type="date"
            value={date } 
            onChange={(e)=>{setDate(e.target.value.toString())
            }}/>
            <br />
            <input type="text" 
            value={username}
            onChange={(e)=>{setUserName(e.target.value)
                setsuggestions(e.target.value)}}
            />
            {
                usersuggestion.map((user)=>(
                    <div className="suggestion" onClick={()=>{
                        setUserName(user.name)
                        setsuggestions([])
                        setUserId(user.id)
                    }}>{user.name}</div>
                ))
            }
          <div className="button-container">
            <button className="button" onClick={editmethod}>Yes</button>
            <button className="button" onClick={ onClose}>No</button>
          </div>
        </div>
      </div>
     );
}
 
export default CreateGeneralHealthRecord;