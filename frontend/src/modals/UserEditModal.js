import { useEffect, useState } from "react";
import { useFileContext } from "../context/useContext";
import "./modal.css"
const UserEditModal = ({ show, onClose,user ,action}) => {
    const [name,setName]=useState(user.name)
    const [email,setEmail] = useState(user.email)
    const [clinicId,setClinicId] = useState(user.clinicId)
    const [userId,setUserId] = useState(user.id)
    const {dispatch:usersDispatch } =useFileContext()
    // console.log(user)
    useEffect(() => {
        if (show) {
          setName(user.name);
          setUserId(user.id)
          setEmail(user.email);
          setClinicId(user.clinicId);
        }
      }, [user, show]);

    const body = {
      name,email,clinicId
    }
    if (!show) {
      return null;
    }
    
    const editmethod = async() =>{
        if(action){
          try {
            const response = await fetch(`http://localhost:4000/users/${userId}/${clinicId}`,{
                method:'PUT',
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
        }else{
          try {
            const response = await fetch(`http://localhost:4000/users/${userId}`,{
                method:'PUT',
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
  };
  
  

export default UserEditModal;