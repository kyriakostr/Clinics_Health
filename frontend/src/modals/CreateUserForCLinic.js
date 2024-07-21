
import { useEffect, useState } from "react";
import { useFileContext } from "../context/useContext";

const CreateUserForClinic = ({show, onClose,clinicid}) => {
    const [name,setName]=useState('')
    const [email,setEmail] = useState('')
    const [clinicId,setClinicId] = useState(parseInt(clinicid))
    
    const {dispatch:usersDispatch } = useFileContext()
    

    const body = {
      name,email,clinicId
    }
    if (!show) {
      return null;
    }
    
    const editmethod = async() =>{
        try {
            const response = await fetch(`http://localhost:4000/users/${clinicId}`,{
                method:'POST',
                body:JSON.stringify(body),
                headers:{'Content-Type':'application/json'}
            })
            const json = await response.json()
            if(response.ok){
              usersDispatch({type:'USERS',payload:json})
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
            value={name } 
            onChange={(e)=>setName(e.target.value)}/>
            <br />
          <input type="text"
            value={email } 
            onChange={(e)=>setEmail(e.target.value)}/>
            <br />
         
          <div className="button-container">
            <button className="button" onClick={editmethod}>Yes</button>
            <button className="button" onClick={ onClose}>No</button>
          </div>
        </div>
      </div>
    );
}
 
export default CreateUserForClinic;