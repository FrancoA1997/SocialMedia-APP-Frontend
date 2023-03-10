import React, { useContext } from 'react'
import Topbar from '../../components/topBar/Topbar'
import Feed from '../../components/feed/Feed';
import Sidebar from "../../components/sidebar/Sidebar"
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from 'react';
import {useParams} from 'react-router'
import useAxios from '../../components/api/useAxios'
import './profile.css'

const Profile = () => {
  const [userFriend, setUserFriend] = useState({});
  const username = useParams().username;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const api = useAxios()

  useEffect( () =>{
    const fetchUser = async() =>{
      const res = await api.get("/users?username=" + username)
      setUserFriend(res.data);
    }
    fetchUser();
  }, [username]);
  return (
    <>
    <Topbar />
    <div className="profileContainer">
      <Sidebar />
      <div className="profileRight">
      <div className="profileTop"> 
      <div className="profileCover">
      <img className='profileCoverImg' src={userFriend.coverPicture ? PF + userFriend.coverPicture : PF + "post/3.jpeg"} alt="" />
      <img className='profileUserImg' src={userFriend.profilePicture ? PF + userFriend.profilePicture : PF + "person/noAvatar.png"} alt="" />
      </div>
        <div className="profileInfo">
          <h4 className='profileInfoName'>{userFriend.username}</h4>
          <span className="profileInfoDesc">{userFriend.description}</span>
        </div>
      </div>
      <div className="profileBottom">
      <Feed username={username}/> 
      <Rightbar userFriend={userFriend}/>
      </div>
      </div>
    </div>
  </>
  )
}

export default Profile