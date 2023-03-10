import React, { useContext, useEffect, useState } from 'react'
import "./sidebar.css"
import CloseFriend from '../closeFriend/CloseFriend'
import useAxios from '../api/useAxios';
import {RssFeed, Chat, PlayCircle,Group,Bookmarks,HelpOutline,WorkOutline, Event,School} from "@mui/icons-material"
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const api = useAxios()
  const {user} = useContext(AuthContext)
  const [friends, setFriends] = useState([])
  useEffect(() => {
    const getFriends = async () => {
      try{
        const res = await api.get("/users/friends/"+ user._id)
        setFriends(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getFriends()
  },[user])

  return (

    <div className='sidebar'>
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon"/>
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
          <Link to={"/messenger"} style={{textDecoration: "none", color: "black"}}>
            <Chat className="sidebarIcon"/>
            <span className="sidebarListItemText">Chat</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <PlayCircle className="sidebarIcon"/>
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon"/>
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmarks className="sidebarIcon"/>
            <span className="sidebarListItemText">Saved</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon"/>
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon"/>
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon"/>
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon"/>
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className='sidebarHr'/>
        <ul className="sidebarFriendList">
         {friends.map((u) => (
            <Link to={"/profile/" + u.username} style={{textDecoration: "none", color: "black"}}>
          <CloseFriend key={u.id} user={u}/>
          </Link>
         ))}
        </ul>
      </div>
    </div>
   
  )
}

export default Sidebar