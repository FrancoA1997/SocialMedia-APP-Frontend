import React from 'react'
import './messenger.css'
import Topbar from '../../components/topBar/Topbar'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/Message/Message'
import ChatOnline from '../../components/ChatOnline/ChatOnline'
const Messenger = () => {
  return (
    <>
    <Topbar/>
    <div className='messenger'>
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input type="text" placeholder='Search for friends' className="chatMenuInput" />
                <Conversation/>
            </div>
        </div>
        <div className="chatBox">
        <div className="chatBoxWrapper">
           <div className="chatBoxTop">
            <Message/>
            <Message own={true} />
            <Message/>
            <Message/>
            <Message own={true} />
            <Message/>
            <Message/>
            <Message own={true} />
            <Message/>
            <Message/>
            <Message own={true} />
            <Message/>
           </div>
           <div className="chatBoxBottom">
            <textarea placeholder='Write something..' className='chatMessageInput'></textarea>
            <button className='chatSubmitButton'>Send</button>
           </div>
        </div>
        </div>
        <div className="chatOnline">
        <div className="chatOnlineWrapper">
            <ChatOnline/>
        </div>
        </div>
    </div>
    </>
  )
}

export default Messenger