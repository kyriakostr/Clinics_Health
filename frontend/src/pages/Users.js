import { useFileContext } from "../context/useContext";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeleteModal from "../modals/DeleteModal";
import UserEditModal from "../modals/UserEditModal";
import CreateUser from "../modals/CreateUserForCLinic";
import CreateGeneralUser from "../modals/CreateGeneralUser";

const Users = ()=>{

    const {users,dispatch} = useFileContext();
    
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
    };
    const handleOpenCreateDialog = () => {
        setShowCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
        setShowCreateDialog(false);
    };
   
    useEffect(()=>{
        const fetchclinics = async ()=>{
            const response = await fetch(`http://localhost:4000/users`)
            const json = await response.json()
            if(response.ok){
                const responseusers = json
                console.log(responseusers)
                dispatch({type:'USERS',payload:responseusers})
                
                
            }
        }

        fetchclinics()

    },[])

    
    return (
        <div>

            <h1>Users</h1>
            <button onClick={handleOpenCreateDialog}>Create user</button>
            {users && users.map((user)=>(

                <div>
                    <div className="card">
                    <p className="edit" onClick={()=>{handleOpenEditDialog(user)}}>&#9998;</p>
                    <p className="delete" onClick={()=>{handleOpenDeleteDialog(user)}}>&#10005;</p>
                    <div key={user.id} className="card-content" >
                    <h2 className="card-title">{user.name}</h2>

                    <p className="card-description">Email:{user.email}</p>
                    {user.clinic && user.clinic.name && (
                    <p className="card-description">Belongs to: {user.clinic.name}</p>
                    )}
                    <Link to={`${user.id}`}>
                    <p className="card-read-more" >Read more</p>
                    </Link>
                    </div>
                    </div>

                    {selectedUser && (
                        <>
                         <DeleteModal show={showdeleteDialog} onClose={handleCloseDeleteDialog} use='users' id={selectedUser.id}/>
                        <UserEditModal show={showeditDialog} onClose={handleCloseEditDialog} user={selectedUser}/>
                        </>
                   )}
                </div>

                
            ))}

            <CreateGeneralUser show={showcreatedialog} onClose={handleCloseCreateDialog}/>
            
        </div>
    )
}

export default Users;