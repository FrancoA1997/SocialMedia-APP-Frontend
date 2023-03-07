import React from 'react'
import './message.css'
const Message = ({own}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
        <img src={PF + "/person/1.jpeg"} alt="" className="messageImg" />
        <p className='messageText'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="messageBottom">
            1 hour ago
        </div>

    </div>
  )
}

export default Message