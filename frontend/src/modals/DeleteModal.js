import { useFileContext } from "../context/useContext";
import "./modal.css"
const DeleteModal = ({ show, onClose, use,id, otherid ,action}) => {
    
    const {dispatch:clinicsDispatch } = useFileContext();
    const {dispatch:usersDispatch } =useFileContext()
    const {dispatch:healthRecordsDispatch } = useFileContext()
    if (!show) {
      return null;
    }

    const deletemethod = async() =>{
       if(action){
        try {
          const response = await fetch(`http://localhost:4000/${use}/${id}/${otherid}`,{
              method:'DELETE'
          })
          const json = await response.json()
          switch (use) {
              case 'clinics':
                  clinicsDispatch({type:'CLINICS',payload:json})
                  break;
              case 'users':
                  usersDispatch({type:'USERS',payload:json})
              case 'health-records':
                  healthRecordsDispatch({type:'HEALTHRECORDS',payload:json})
              default:
                  break;
          }
          onClose()
      } catch (error) {
          console.log(error)
      }

       }else{
        try {
          const response = await fetch(`http://localhost:4000/${use}/${id}`,{
              method:'DELETE'
          })
          const json = await response.json()
          switch (use) {
              case 'clinics':
                  clinicsDispatch({type:'CLINICS',payload:json})
                  break;
              case 'users':
                  usersDispatch({type:'USERS',payload:json})
              case 'health-records':
                  healthRecordsDispatch({type:'HEALTHRECORDS',payload:json})
              default:
                  break;
          }
          onClose()
      } catch (error) {
          console.log(error)
      }
       }
    }
  
    return (
        <div className="overlay" >
        <div className="dialog">
          <h2>Alert</h2>
          <p>Are you sure you want to proceed?</p>
          <div className="button-container">
            <button className="button" onClick={deletemethod}>Yes</button>
            <button className="button" onClick={onClose}>No</button>
          </div>
        </div>
      </div>
    );
  };
  
  

export default DeleteModal;