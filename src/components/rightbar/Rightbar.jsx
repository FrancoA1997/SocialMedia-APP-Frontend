import { Link } from 'react-router-dom'
import { Add, Remove } from '@mui/icons-material'
import React, { useContext, useState, useEffect, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import useAxios from '../api/useAxios'
import Online from '../Online/Online'
import ProfileInfo from '../profileInfo/ProfileInfo'
import "./rightbar.css"

const Rightbar = ({user}) => {
  const api = useAxios()
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends ] = useState([])
  const {user: currentUser, dispatch} = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  

   ///Sets if the current user is following the current profile 
  useEffect(() => {
    const isFollowing = () => {
      setFollowed(currentUser.following?.includes(user?._id))
    }
    isFollowing()
  },[user, currentUser])
    
    
  ///Get friends depending if the user is on the feed or profile page
  useEffect(() => {
    const getProfileFriends = async () => {
      try{
        const friendList = await api.get("/users/friends/" + user?._id);
        setFriends(friendList.data);
      }catch(err){
        console.log("No user yet to be fetched")
      }
    };
    const getFeedFriends = async () => {
      try{
        const friendList = await api.get("/users/friends/" + currentUser?._id);
        setFriends(friendList.data);
      }catch(err){
        console.log("No user yet to be fetched")
      }
    };
    user ? getProfileFriends() : getFeedFriends()
  }, [user])

// Function that handle following state on the client and server side
  const followHandle = async () =>{
    try{
      if(followed){
        await api.put("/users/"+user._id+"/unfollow", {
          userId: currentUser._id
        });
        dispatch({
          type: "UNFOLLOW",
          payload: user._id

        });
      }else{
        await api.put("/users/"+user._id+"/follow",  {
          userId: currentUser._id
        });
        dispatch({
          type: "FOLLOW",
          payload: user._id
        });
      }
    }catch(err){
      console.log(err)
    }
    setFollowed(!followed);
  };

  const HomeRightbar = () =>{
    return(
    <>
       <div className="birthdayContainer">
          <img className='birthdayImg' src={`${PF}gift.png`} alt="" />
          <span className="birthdayText"><b>Pola Foster</b> and <b>3 other friends</b> have a birthday today!</span>
        </div>
        <img src={`${PF}ad.png`} alt="" className="rightbarAd" />
        <ul className="rightbarFriendList">
        <div>Online Friends</div>
          <Link to="/messenger" style={{textDecoration: "none", color: "black"}}>
          <Online />
          </Link>
        </ul>
    </>
    )
  }

  const ProfileRightbar = () =>{
    return(
    <>
    {user.username !== currentUser.username && (
      <button className='rightbarFollowButton' onClick={followHandle}>
        {followed ? "Unfollow" : "Follow" }
        {followed ? <Remove/> :  <Add/> }
        </button>
    )}

    <ProfileInfo user={user}/>
    <h4 className='rightbarTitleContacts'>Contacts:</h4>
      <div className="rightbarFollowings">
        {friends.map((friend) => (
            <Link to={"/profile/" + friend.username} style={{textDecoration: "none", color: "black"}}>
          <div className="rightbarFollowing">
          <img src={friend.profilePicture ? PF + friend.profilePicture : PF +"person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
        <span className="rightbarFollowingName">{friend.username}</span>
        </div>
   </Link>
   ))}
      </div>
      
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
     {user ? <ProfileRightbar/> : <HomeRightbar/>}
      </div>
    </div>
  )
}

export default Rightbar