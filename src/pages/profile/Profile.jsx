import React from 'react'
import Topbar from '../../components/topBar/Topbar'
import Feed from '../../components/feed/Feed';
import Sidebar from "../../components/sidebar/Sidebar"
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from 'react';
import axios from 'axios'
import {useParams} from 'react-router'

import './profile.css'
const Profile = () => {
  const [user, setUser] = useState({});
  const username = useParams().username
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect( () =>{
    const fetchUser = async() =>{
      const res = await axios.get(`/users?username=${username}`)
      setUser(res.data);
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
      <img className='profileCoverImg' src={user.coverPicture || PF + "post/3.jpeg"} alt="" />
      <img className='profileUserImg' src={user.profilePicture || PF + "person/7.jpeg"} alt="" />
      </div>
        <div className="profileInfo">
          <h4 className='profileInfoName'>{user.username}</h4>
          <span className="profileInfoDesc">{user.description}</span>
        </div>
      </div>
      <div className="profileBottom">
      <Feed username={username}/> 
      <Rightbar user={user}/>
      </div>
      </div>
    </div>
  </>
  )
}

export default Profile