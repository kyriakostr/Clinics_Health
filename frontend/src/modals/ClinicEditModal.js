import { useEffect, useState } from "react";
import { useFileContext } from "../context/useContext";
import "./modal.css"
const ClinicEditModal = ({ show, onClose,clinic}) => {
    const [name,setName]=useState(clinic.name)
    const [adress,setAdress] = useState(clinic.adress)
    const [email,setEmail] = useState(clinic.email)
    const [phone,setPhone] = useState(clinic.phone)
    const [clinicid,setClinicId] = useState(clinic.id)
    const {dispatch:clinicsDispatch } = useFileContext();


    useEffect(() => {
      if (show) {
        setName(clinic.name);
        setAdress(clinic.adress);
        setEmail(clinic.email);
        setPhone(clinic.phone);
        setClinicId(clinic.id)
      }
    }, [clinic, show]);
    const body = {
      name,adress,email,phone
    }
    if (!show) {
      return null;
    }
    
    const editmethod = async() =>{
        try {
            const response = await fetch(`http://localhost:4000/clinics/${clinicid}`,{
                method:'PUT',
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
  
  

export default ClinicEditModal;