import React from 'react'
import "./topbar.css"
import {Search, Person, Chat, Notifications} from "@mui/icons-material"
import {Link} from 'react-router-dom'

const Topbar = () => {
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
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
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
        <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
      </div>
    </div>
  )
}

export default Topbar