import React, { useEffect, useState } from 'react'
import "./conversation.css"
import useAxios from '../api/useAxios'
const Conversation = ({conversation, currentUser}) => {
    const [userFriend, setUserFriend] = useState(null)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const api = useAxios()

  useEffect(()=>{
    const friendId = conversation.members.find((m) => m !== currentUser._id)
    const getUser = async () =>{
      try{
        const res = await api.get("/users?userId=" + friendId);
        setUserFriend(res.data);

      }catch(err){
        console.log(err)
      }
    };
    getUser();
    
  },[conversation ,currentUser])

  return (

    <div className='conversation'>
        <img src={ userFriend?.profilePicture 
          ? PF + userFriend?.profilePicture 
          : PF + "/person/noAvatar.png"} 
          alt="" className="conversationImg" />
        <span className="conversationName">{userFriend?.username}</span>
        </div>
  )
}

export default Conversation