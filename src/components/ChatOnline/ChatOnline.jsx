import React, { useContext, useEffect,useState, useRef } from 'react'
import './chatonline.css'
import { AuthContext } from '../../context/AuthContext';
import useAxios from '../api/useAxios'
const ChatOnline = ({onlineUsers ,setCurrentChat }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user: currentUser} = useContext(AuthContext)
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const api = useAxios()
 
    
   
    const handleClick = async (user) =>{
    const newConversation = {
      senderId: currentUser._id,
      receiverId: user._id,
    }

    try{
      const res = await api.get(`/conversation/find/${user._id}/${currentUser._id}`)
      if(res.data === null)
        try{
          const res2 = await api.post(`/conversation/`, newConversation)
          setCurrentChat(res2.data)
      }catch(err2){
        console.log(err2)
      }
      setCurrentChat(res.data)
    }catch(err){
      console.log(err)
     }}

    useEffect(() => {
      const getFriends = async () => {
        const res = await api.get("/users/friends/" + currentUser._id)
        setFriends(res.data)
        console.log(friends, "friends")
      }
      getFriends();
    },[currentUser])

   

    useEffect(() => {
      setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)))
      console.log(onlineFriends, "online friends")
    },[onlineUsers]) 

   
  return (
    <div className='chatOnline'>
      <span>Online Friends:</span>
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
            <div className="chatOnlineImgContainer">
              <img src={ o?.profilePicture 
                ? PF + o?.profilePicture 
                : PF + "/person/noAvatar.png"} className='chatOnlineImg' alt="" />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{o.username}</span>
            </div>
            ))}
              
    </div>
  )
}

export default ChatOnline