import React, { useContext, useState, useEffect } from 'react'
import './message.css'
import {format} from 'timeago.js'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
const Message = ({message, own, members}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user: currentUser} = useContext(AuthContext);
    const friendId = members.find((m) => m !== currentUser._id)
    const [chatUser, setChatUser] = useState();

    useEffect(() => {
      const getChatUser= async () => {
        try{
          const res = await axios.get("/users?userId=" + friendId, {
            headers: {authorization: "Bearer " + currentUser.accessToken},
    
          })
          setChatUser(res.data);
        }catch(err){
          console.log(err)
        }
      }
    getChatUser()
    },[friendId])
   

  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">{ own 
        ? <img src={currentUser?.profilePicture ? PF + currentUser?.profilePicture : PF + "/person/noAvatar.png"} alt="" className="messageImg" />
        : <img src={chatUser?.profilePicture ? PF + chatUser?.profilePicture : PF + "/person/noAvatar.png"} alt="" className="messageImg" />
        }
        <p className='messageText'>{message.text}</p>
        </div>
        <div className="messageBottom">
           {format(message.createdAt)}
        </div>

    </div>
  )
}

export default Message