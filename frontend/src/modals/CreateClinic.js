import { useEffect, useState } from "react";
import { useFileContext } from "../context/useContext";

const CreateClinic = ({ show, onClose}) => {
    const [name,setName]=useState('')
    const [adress,setAdress] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    

    const {dispatch:clinicsDispatch } = useFileContext();


    
    const body = {
      name,adress,email,phone
    }
    if (!show) {
      return null;
    }
    
    const editmethod = async() =>{
        try {
            const response = await fetch(`http://localhost:4000/clinics`,{
                method:'POST',
                body:JSON.stringify(body),
                headers:{'Content-Type':'application/json'}
            })
            const json = await response.json()
            if(response.ok){
              clinicsDispatch({type:'CLINICS',payload:json})
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
          <input type=""
            value={email } 
            onChange={(e)=>setEmail(e.target.value)}/>
            <br />
          <input type="text"
            value={adress } 
            onChange={(e)=>setAdress(e.target.value)}/>
            <br />
          <input type="number"
            value={phone } 
            onChange={(e)=>setPhone(e.target.value)}/>
          <div className="button-container">
            <button className="button" onClick={editmethod}>Yes</button>
            <button className="button" onClick={ onClose}>No</button>
          </div>
        </div>
      </div>
    );
  };
 
export default CreateClinic;