import React from 'react'
import Topbar from '../../components/topBar/Topbar'
import Feed from '../../components/feed/Feed';
import Sidebar from "../../components/sidebar/Sidebar"
import Rightbar from "../../components/rightbar/Rightbar";
import './profile.css'
const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
    <Topbar />
    <div className="profileContainer">
      <Sidebar />
      <div className="profileRight">
      <div className="profileTop"> 
      <div className="profileCover">
      <img className='profileCoverImg' src={`${PF}post/3.jpeg`} alt="" />
      <img className='profileUserImg' src={`${PF}person/7.jpeg`} alt="" />
      </div>
        <div className="profileInfo">
          <h4 className='profileInfoName'>My name</h4>
          <span className="profileInfoDesc">Hello my friends!</span>
        </div>
      </div>
      <div className="profileBottom">
      <Feed/> 
      <Rightbar profile/>
      </div>
      </div>
    </div>
  </>
  )
}

export default Profile