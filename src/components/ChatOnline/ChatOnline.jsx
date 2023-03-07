import React from 'react'
import './chatonline.css'
const ChatOnline = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className='chatOnline'>
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img src={PF + "/person/5.jpeg"} className='chatOnlineImg' alt="" />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">Pepe pistolero</span>
        </div>
    </div>
  )
}

export default ChatOnline