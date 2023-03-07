import React, { useContext, useEffect, useState, useRef } from 'react'
import Conversation from '../../components/conversations/Conversation'
import ChatOnline from '../../components/ChatOnline/ChatOnline'
import { AuthContext } from '../../context/AuthContext'
import Message from '../../components/Message/Message'
import ScrollToBottom from 'react-scroll-to-bottom';
import Topbar from '../../components/topBar/Topbar'
import axios from 'axios'
import './messenger.css'
const Messenger = () => {
  const {user} = useContext(AuthContext);
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessages, setNewMessages] = useState("")
  
  
  useEffect(() =>{
    const getConversations = async () =>{
      try{
        const response = await axios.get("/conversation/" + user._id);
        setConversations(response.data);
      }catch(err){
        console.log(err);
      }
    }
    getConversations();
  },[user._id])

  useEffect(() => {
    const getMessages = async () => {
      try{
        const res = await axios.get("/message/"+ currentChat?._id)
        setMessages(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getMessages();
  }, [currentChat])

  const handleSubmit= async (e) =>{
    const message = {
      sender: user._id,
      text: newMessages,
      conversationId: currentChat._id,
    };
    try{
      const res = await axios.post("/message/", message)
      setMessages([...messages, res.data]);
      setNewMessages("")
    }catch(err){
      console.log(err)
    }
  }


  
  return (
    <>
    <Topbar/>
    <div className='messenger'>
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input type="text" placeholder='Search for friends' className="chatMenuInput" />
                {conversations.map((c) => (
                  <div className="" onClick={() => setCurrentChat(c)}>
                  <Conversation  conversation={c} currentUser={user} />
                  </div>
                  ))}
            </div>
        </div>
        <div className="chatBox">
        <div className="chatBoxWrapper">
          {
            currentChat
             ? (
          <>
           <div className='chatBoxTop'>
           <ScrollToBottom className='message-container' >
            {messages.map((m) => (
              <Message message={m} own={m.sender === user?._id} members={currentChat.members}/>
            ))}
            </ScrollToBottom>
           
           </div>
           <div className="chatBoxBottom">
            <textarea
             placeholder='Write something..'
             className='chatMessageInput'
             onChange={(e) => setNewMessages(e.target.value)}
             onKeyPress={(e) => {
              e.key === "Enter" && handleSubmit()
             }}
             value={newMessages}
             ></textarea>
            <button className='chatSubmitButton'  onClick={handleSubmit}>Send</button>
           </div>
           </>
           ) 
           : (<span className='noConversationText'>
             Open a conversation to start chatting...
             </span>
             )};
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