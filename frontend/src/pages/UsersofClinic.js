import { useFileContext } from "../context/useContext";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeleteModal from "../modals/DeleteModal";
import UserEditModal from "../modals/UserEditModal";
import CreateUserForClinic from "../modals/CreateUserForCLinic";

const UsersofClinic = ()=>{

    const {users,dispatch} = useFileContext();
    const [title,setTitle]= useState('')
    const {id} = useParams();

    const [showdeleteDialog, setShowDeleteDialog] = useState(false);
    const [showeditDialog, setShowEditDialog] = useState(false);
    const [showcreatedialog,setShowCreateDialog] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null);

    const handleOpenDeleteDialog = (user) => {
        setSelectedUser(user)
        setShowDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setShowDeleteDialog(false);
    };
    const handleOpenEditDialog = (user) => {
        setSelectedUser(user)
        setShowEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setShowEditDialog(false);
        setSelectedUser(null)
    };
    const handleOpenCreateDialog = () => {
        setShowCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
        setShowCreateDialog(false);
    };
   
    useEffect(()=>{
        const fetchclinics = async ()=>{
            const response = await fetch(`http://localhost:4000/clinics/${id}`)
            const json = await response.json()
            if(response.ok){
                const responseusers = json.users
                dispatch({type:'USERS',payload:responseusers})
                setTitle(json.name)
                
            }
        }

        fetchclinics()

    },[title])

    
    return (
        <div>

            <h1>Users of {title}</h1>
            <button onClick={handleOpenCreateDialog}>Create user for Clinic</button>
            {users && users.map((user)=>(

                <div>
                    <div className="card">
                    <p className="edit" onClick={()=>{handleOpenEditDialog(user)}}>&#9998;</p>
                    <p className="delete" onClick={()=>{handleOpenDeleteDialog(user)}}>&#10005;</p>
                    <div key={user.id} className="card-content" >
                    <h2 className="card-title">{user.name}</h2>

                    <p className="card-description">Email:{user.email}</p>
                    <Link to={`/clinics/${id}/${user.id}`}>
                    <p className="card-read-more" >Read more</p>
                    </Link>
                    </div>
                    </div>

                    {selectedUser && (
                        <>
                         <DeleteModal show={showdeleteDialog} onClose={handleCloseDeleteDialog}
                          use='users' id={selectedUser.id} otherid={selectedUser.clinicId} action={true}/>
                        <UserEditModal show={showeditDialog} onClose={handleCloseEditDialog} user={selectedUser} action={true}/>
                        </>
                   )}
                </div>

                
            ))}

            <CreateUserForClinic show={showcreatedialog} onClose={handleCloseCreateDialog} clinicid={id}/>
            
        </div>
    )
}

export default UsersofClinic;