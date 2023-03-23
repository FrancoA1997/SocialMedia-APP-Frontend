import React, { useContext, useState, useEffect, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import useAxios from '../api/useAxios'
import {io} from "socket.io-client" 
import './online.css'
const Online = ({}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user: currentUser} = useContext(AuthContext)
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const api = useAxios()
  const [onlineUsers,setOnlineUsers] = useState([]);
  const socket = useRef();
  
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  },[]);
  
  useEffect(()=> {
    socket.current.emit("addUser", currentUser._id)
    socket.current.on("getUsers", socketUsers=> {
      setOnlineUsers(currentUser.following.filter((friend) => socketUsers.some((userS) => userS.userId === friend)));
     
    });
  }, [currentUser])

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
    <div className="rightbarFriendList">
    
      {onlineFriends.map((friend) => ( 
        <>
        <div className="rightbarFriend">
          <div className="rightbarProfileImgContainer">
          <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"} alt="" className="rightbarProfileImg" />
          <span className="rightbarOnline"></span>
        </div><span className="rightbarUsername">{friend.username}</span>
        </div>
        </>
            ))}
         
          </div>
  )
}

export default Online