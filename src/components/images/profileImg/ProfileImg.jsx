import React, { useContext } from 'react';
import './profileimg.css'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useState } from 'react';
import useAxios from '../../api/useAxios';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { AuthContext } from '../../../context/AuthContext';


const ProfileImg = ({user}) => {
    const [profilePicture, setProfilePicture] = useState(null)
    const [disabledButton, setDisabledButton] = useState(false)
    const {user : currentUser} = useContext(AuthContext)
    const api = useAxios()
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const submitProfile = async (e) =>{
      e.preventDefault()

      function undo() {
        setProfilePicture(null);
        setDisabledButton(false)
      }
      
      const updatedUser  = {
              userId : user._id,
              password: user.password,
          };
          if(profilePicture){
              console.log("file here!")
              const data = new FormData();
              const fileName = Date.now() + profilePicture.name;
              data.append("name1", fileName);
              data.append("file", profilePicture);
              updatedUser.profilePicture = fileName;
                 try{
                  await api.post("/upload" , data);
                  window.location.reload();
              }catch(err){
                  console.log(err);
              }
          }
          try{
           await api.put("/users/" + user._id, updatedUser);
          }catch(err){
              console.log(err);
          };
      }
  return (
    <form onSubmit={submitProfile} className='imgWrapper'>
    <img className='profileUserImg' src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" />
    {profilePicture && (
                <div className='imgWrapper' >
                    <img className='profileUserImgPreview' src={URL.createObjectURL(profilePicture)} alt="" />
                    <button className="btn-styless" type="submit"><SendIcon className='btn-submit-pp' /></button>
                    <DeleteIcon className='btn-cancel-pp' onClick={() => {setProfilePicture(null);
        setDisabledButton(false);}}/> 
                </div>
            )}
   {user.username === currentUser.username && (<label htmlFor='profilePicture' className='btn-changeProfilePic'>
    {disabledButton 
    ?  <PhotoCamera className='disabled' />
    :  <PhotoCamera />}
       <input style={{display:"none"}}
        type="file"
        id="profilePicture"
        accept='.png, .jpeg, .jpg'
        onChange={(e) => setProfilePicture(e.target.files[0])} />
       
    </label>)}
    </form>
  )
}

export default ProfileImg