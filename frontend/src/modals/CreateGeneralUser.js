
import { useEffect, useState } from "react";
import { useFileContext } from "../context/useContext";

const CreateGeneralUser= ({show, onClose}) => {
    const [name,setName]=useState('')
    const [email,setEmail] = useState('')
    const [clinics,setClinics] = useState([])
    const [clinicId,setClinicId] = useState(null)
    
    const {dispatch:usersDispatch } = useFileContext();

    const getclinics = async()=>{
        try {
            const response = await fetch(`http://localhost:4000/clinics`)
            const json = await response.json()
            if(response.ok){
              setClinics(json)
              
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(()=>{
        getclinics();
    },[clinics])

    const body = {
      name,email,clinicId
    }
    if (!show) {
      return null;
    }
    
    const editmethod = async() =>{
        try {
            const response = await fetch(`http://localhost:4000/users`,{
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
            placeholder="Name"
            onChange={(e)=>setName(e.target.value)}/>
            <br />
          <input type="text"
            value={email } 
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}/>
            <br />
         <div>
         <select name="Clinics" id="" onChange={(e)=>{setClinicId(parseInt(e.target.value))}}>
            <option value="" disabled selected>Select Clinic</option>
            {clinics.map((clinic)=>(
                
                    <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
                
            ))}
         </select>
         </div>
          <div className="button-container">
            <button className="button" onClick={()=>{editmethod()}}>Yes</button>
            <button className="button" onClick={ onClose}>No</button>
          </div>
        </div>
      </div>
    );
}
 
export default CreateGeneralUser;