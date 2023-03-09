import React, { useContext } from 'react'
import "./topbar.css"
import {Search, Person, Chat, Notifications} from "@mui/icons-material"
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

const Topbar = () => {
  const {user} = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const logoutHandler = async (e) => {
    e.preventDefault()
    try{
      axios.post("/auth/logout", {
        token : user.refreshToken
      }, {
        headers: {authorization: "Bearer " + user.accessToken},

      });
    }catch(err){
      console.log(err)
    }
  }


  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <Link to='/' style={{textDecoration: 'none'}}>
         <span className="logo">Dev Social</span>
         </Link>
       
      </div>
      <div className='topbarCenter'>
        <div className="searchbar">
          <Search className='searchicon'/>
          <input placeholder='Search fro friends, post or any video' className="searchInput" />
        </div>
      </div>
      <div className='topbarRight'>
        <div className="topbarLinks">
        
          <span className="topbarLink" onClick={logoutHandler}>Logout</span>
          
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person/>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat/>
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications/>
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
        <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  )
}

export default Topbar