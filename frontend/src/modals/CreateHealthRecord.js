import { useEffect, useState } from "react";
import { useFileContext } from "../context/useContext";
import {  formatDateForInput } from "../function/dateformat";
import "./modal.css"

const CreateHealthRecord = ({ show, onClose, userid}) => {

    const [description,setDescription]=useState('')
    const [date,setDate] = useState('')
    const [userId,setUserId] = useState(parseInt(userid))
    
    const {dispatch } =useFileContext()
    
    
//    console.log(userId)
    const body = {
      description,date,userId
    }
    if (!show) {
      return null;
    }
    
    
    const editmethod = async() =>{
        try {
            const response = await fetch(`http://localhost:4000/health-records/${userId}`,{
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
            console.log(error.message)
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
            onChange={(e)=>{
                
                setDate(e.target.value.toString())
            }}
             
            />
            <br />
         
          <div className="button-container">
            <button className="button" onClick={editmethod}>Yes</button>
            <button className="button" onClick={ onClose}>No</button>
          </div>
        </div>
      </div>
     );
}
 
export default CreateHealthRecord;