import { useFileContext } from "../context/useContext";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeleteModal from "../modals/DeleteModal";
import HealthRecordsEditModal from "../modals/HealthRecordsEditModal";
import CreateHealthRecord from "../modals/CreateHealthRecord";

const HealthRecordsofUsers = ()=>{
    const {healthrecords,dispatch} = useFileContext();
    const [title,setTitle]= useState('')
    const {userid} = useParams();
    const [showdeleteDialog, setShowDeleteDialog] = useState(false);
    const [showeditDialog, setShowEditDialog] = useState(false);
    const [showcreatedialog,setShowCreateDialog] = useState(false)
    const [selectedHealthRecord, setSelectedHealthRecord] = useState(null);
    
    const handleOpenDeleteDialog = (healthrecord) => {
        setSelectedHealthRecord(healthrecord)
        setShowDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setShowDeleteDialog(false);
    };
    const handleOpenEditDialog = (healthrecord) => {
        setSelectedHealthRecord(healthrecord)
        setShowEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setShowEditDialog(false);
    };
    const handleOpenCreateDialog = () => {
        setShowCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
        setShowCreateDialog(false);
    };
   
    useEffect(()=>{
        const fetchclinics = async ()=>{
            const response = await fetch(`http://localhost:4000/users/${userid}`)
            const json = await response.json()
            if(response.ok){
                // console.log(json)
                const responsehealthrecords = json.healthrecords
                dispatch({type:'HEALTHRECORDS',payload:responsehealthrecords})
                setTitle(json.name)
                
            }
        }

        fetchclinics()

    },[title])
    
    return(
        <div>
            <h1>Healthrecords of {title}</h1>
           
            <button onClick={handleOpenCreateDialog}>Create new Health Record</button>
            {healthrecords && healthrecords.map((healthrecord)=>(

                <div>
                    <div className="card">
                    <p className="edit" onClick={()=>handleOpenEditDialog(healthrecord)}>&#9998;</p>
                    <p className="delete" onClick={()=>handleOpenDeleteDialog(healthrecord)}>&#10005;</p>
                    <div key={healthrecord.id} className="card-content" >
                    <h2 className="card-title">{healthrecord.description}</h2>
                    
                    
                    
                    <p className="card-description">Date:{healthrecord.date}</p>
                    </div>
                    </div>
                    {selectedHealthRecord && <>

                        <DeleteModal show={showdeleteDialog} onClose={handleCloseDeleteDialog}
                         use='health-records' id={selectedHealthRecord.id} action={true} otherid={selectedHealthRecord.userId}/>
                        <HealthRecordsEditModal show={showeditDialog} onClose={handleCloseEditDialog} healthrecord={selectedHealthRecord} action={true} />
                    </>
                        
                        }
                </div>

                
            ))}

            <CreateHealthRecord show={showcreatedialog} onClose={handleCloseCreateDialog} userid={userid}/>
            
        </div>
    )
}
export default HealthRecordsofUsers;