import React from 'react'
import Topbar from '../../components/topBar/Topbar'
import Feed from '../../components/feed/Feed';
import Sidebar from "../../components/sidebar/Sidebar"
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
const Home = () => {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>


    </>
  )
}

export default Home