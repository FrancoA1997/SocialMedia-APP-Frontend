import React from 'react'
import useAxios from '../../api/useAxios'
import "./coverimg.css"
import { useState, useContext } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { AuthContext } from '../../../context/AuthContext';
const CoverImg = ({user}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const api = useAxios()
    const {user : currentUser} = useContext(AuthContext)
    const [disabledButton, setDisabledButton] = useState(false)
    const [coverImg, setCoverImg] = useState(null)
    const submitCover = async (e) =>{
      e.preventDefault()
      const updatedUser  = {
              userId : user._id,
              password: user.password,
          };
          if(coverImg){
              console.log("file here!")
              const data = new FormData();
              const fileName = Date.now() + coverImg.name;
              data.append("name1", fileName);
              data.append("file", coverImg);
              updatedUser.coverPicture = fileName;
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
    <>
    <form onSubmit={submitCover}>
    <div className='coverContainer'>
    <img className='profileCoverImg' src={user.coverPicture ? PF + user.coverPicture : PF + "post/3.jpeg"} alt="" />
    {coverImg && (
                <div className='imgWrapper' >
                    <img className='profileCoverImg-preview' src={URL.createObjectURL(coverImg)} alt="" />
                    <button className="btn-styless" type="submit"><SendIcon className='btn-submit' /></button>
                    <DeleteIcon className='btn-cancel' onClick={() => {
                      setCoverImg(null);
                      setDisabledButton(false)
                       }}/> 
                </div>
            )}
  {user.username === currentUser.username &&( <label htmlFor='coverImg' className='btn-changeProfilePic'>
    {disabledButton 
    ? <div className="btn-changeProfileCover fade-out" >
    <ChangeCircleIcon style={{paddingRight: "5px", paddingLeft: "0px"}}/>
    <p>cover</p>
    </div>
    : <div className="btn-changeProfileCover" onClick={() => setDisabledButton(true)}>
        <ChangeCircleIcon style={{paddingRight: "5px", paddingLeft: "0px"}}/>
        <p>cover</p>
        </div>} 
       <input style={{display:"none"}}
        type="file"
        id="coverImg"
        accept='.png, .jpeg, .jpg'
        onChange={(e) => setCoverImg(e.target.files[0])} />
    </label>)}
    </div>
    </form>
    </>
      
  )
}

export default CoverImg