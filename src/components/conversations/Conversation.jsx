import React from 'react'
import "./conversation.css"
const Conversation = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className='conversation'>
        <img src={PF + "/person/1.jpeg"} alt="" className="conversationImg" />
        <span className="conversationName"> Pepa pig </span>
        </div>
  )
}

export default Conversation