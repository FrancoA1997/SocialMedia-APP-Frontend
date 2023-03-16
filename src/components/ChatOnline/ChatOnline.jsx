import React, { useContext, useEffect,useState } from 'react'
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
      try{
        const res = await api.get(`/conversation/find/${user._id}/${currentUser._id}`)
        setCurrentChat(res.data);
      }catch(err){
        console.log(err)
      }
    }
    useEffect(() => {
      const getFriends = async () => {
        const res = await api.get("/users/friends/" + currentUser._id)
        setFriends(res.data)
      }
      getFriends();
    },[currentUser])

    useEffect(() => {
      setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)))

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