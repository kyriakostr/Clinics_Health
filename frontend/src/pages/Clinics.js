import { useFileContext } from "../context/useContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "../modals/DeleteModal";
import ClinicEditModal from "../modals/ClinicEditModal";
import CreateClinic from "../modals/CreateClinic";


const Clinics=()=>{

    const {clinics,dispatch} = useFileContext()
    const [showdeleteDialog, setShowDeleteDialog] = useState(false);
    const [showeditDialog, setShowEditDialog] = useState(false);
    const [selectedClinic, setSelectedClinic] = useState(null);
    const [showcreatedialog,setShowCreateDialog] = useState(false)

    const handleOpenDeleteDialog = (clinic) => {
        setSelectedClinic(clinic);
        setShowDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setShowDeleteDialog(false);
    };
    const handleOpenEditDialog = (clinic) => {
        setSelectedClinic(clinic);
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
            const response = await fetch('http://localhost:4000/clinics')
            const json = await response.json()
            if(response.ok){
                
                dispatch({type:'CLINICS',payload:json})
                // console.log(json)
                
            }
        }

        fetchclinics()

    },[])
    

    return (
        <div>
            <h1>Clinics</h1>
            
            <button onClick={handleOpenCreateDialog}>Create Clinic</button>
            {clinics && clinics.map((clinic)=>(
                 <div>

                   <div className="card"> 
                    <div key={clinic.id} className="card-content" >

                    <p className="edit" onClick={()=>{handleOpenEditDialog(clinic)}}>&#9998;</p>
                    <p className="delete" onClick={() => handleOpenDeleteDialog(clinic)}>&#10005;</p>
                    <h2 className="card-title">{clinic.name}</h2>
                    <h4>Adress:{clinic.adress}</h4>
                    <h5 >Contact Info:</h5>
                    <p className="card-description">Phone:{clinic.phone}</p>
                    <p className="card-description">Email:{clinic.email}</p>

                    <Link to={`/clinics/${clinic.id}`}>
                    <p className="card-read-more">Read More </p>
                    </Link>

                    </div>

                </div>
                
                {selectedClinic && (
                <>
                <DeleteModal show={showdeleteDialog} onClose={handleCloseDeleteDialog} use='clinics' id={selectedClinic.id} />
                <ClinicEditModal show={showeditDialog} onClose={handleCloseEditDialog} clinic={selectedClinic} />
                </>
                )}
                </div>
            ))}

            <CreateClinic show={showcreatedialog} onClose={handleCloseCreateDialog}/>
            
        </div>
    )
}

export default Clinics;