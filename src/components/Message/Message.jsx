import React, { useContext, useState, useEffect } from 'react'
import './message.css'
import {format} from 'timeago.js'
import { AuthContext } from '../../context/AuthContext';

import useAxios from '../api/useAxios'
const Message = ({message, own, members}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user: currentUser} = useContext(AuthContext);
    const friendId = members.find((m) => m !== currentUser._id)
    const [chatUser, setChatUser] = useState();
    const api = useAxios()

    useEffect(() => {
      const getChatUser= async () => {
        try{
          const res = await api.get("/users?userId=" + friendId)
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