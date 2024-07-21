import { useEffect, useState } from "react";
import { useFileContext } from "../context/useContext";
import { formatDateForInput } from "../function/dateformat";
import "./modal.css"

const HealthRecordsEditModal = ({ show, onClose,healthrecord,action}) => {

    const [description,setDescription]=useState(healthrecord.description)
    const [date,setDate] = useState(healthrecord.date)
    const [userId,setUserId] = useState(healthrecord.userId)
    
    const {dispatch } =useFileContext()
    console.log(healthrecord)
    useEffect(() => {
        if (show) {
          setDescription(healthrecord.description);
         
          setDate(healthrecord.date);
          setUserId(healthrecord.userId);
        }
      }, [healthrecord, show]);

    const body = {
      description,date,userId
    }
    if (!show) {
      return null;
    }
    
    const editmethod = async() =>{
        if(action){
          try {
            const response = await fetch(`http://localhost:4000/health-records/${healthrecord.id}/${userId}`,{
                method:'PUT',
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
        }else{
          try {
            const response = await fetch(`http://localhost:4000/health-records/${healthrecord.id}`,{
                method:'PUT',
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
            onChange={(e)=>setDate(e.target.value.toString())}/>
            <br />
         
          <div className="button-container">
            <button className="button" onClick={editmethod}>Yes</button>
            <button className="button" onClick={ onClose}>No</button>
          </div>
        </div>
      </div>
     );
}
 
export default HealthRecordsEditModal;