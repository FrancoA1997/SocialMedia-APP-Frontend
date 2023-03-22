import React, { useContext, useRef, useState } from 'react'
import "./maininfo.css"
import { AuthContext } from '../../../context/AuthContext'
import useAxios from '../../api/useAxios'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
const MainInfo = ({isUpdatingMain, setIsUpdatingMain}) => {
    const {user, dispatch} = useContext(AuthContext)
    const newDescription = useRef()
    const newUsername = useRef()
    const api = useAxios()

    

    const mainInfoHandler = async (e) => {
        e.preventDefault()
        const updatedUserInfo = {
            userId: user._id,
            password: user.password,
            username: (newUsername.current.value ? newUsername.current.value : user.username),
            description: (newDescription.current.value ? newDescription.current.value : user.description),
        }
        try {
           
           await api.put("/users/" + user._id, updatedUserInfo);
           dispatch({
            type: "REFRESH_USER",
            payload:{
            newUsername: updatedUserInfo.username,
            newDescription: updatedUserInfo.description,
            } 
            });
           window.location.replace("/profile/" + updatedUserInfo.username);
        } catch (err) {
            console.log(err);
        };
    }

  return (
    <>
   {isUpdatingMain &&
    
     <div className='overlay'>
   <div className='modal-container'>
       <div className="modal-top">
           <h1 className="title">Update personal information</h1>
       </div>
       <form className="modal-content" onSubmit={mainInfoHandler}>
           <span className='input-Title'>Username:</span>
           <input type="text" className="changeUsername" placeholder={user.username} ref={newUsername} />
           <span className='input-Title'>Description: </span>
           <textarea className='text-area-desc' name="" id="" cols="10" rows="10" ref={newDescription}/>
        <div className="modal-bottom">
           <button type='submit' className='confirmButton' ><CheckIcon/></button>
           <button className='cancelButton' type='button' onClick={() => { setIsUpdatingMain(false)}}><ClearIcon/></button>
       </div>
       </form>
   </div>
</div> 

} 
</>
  )
}

export default MainInfo