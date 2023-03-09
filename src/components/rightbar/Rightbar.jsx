import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { Add, Remove } from '@mui/icons-material'
import { Users } from '../../dummydata'
import Online from '../Online/Online'
import axios from 'axios'
import "./rightbar.css"

const Rightbar = ({userFriend}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends ] = useState([])
  const {user: currentUser, dispatch} = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.following?.includes(userFriend?._id)
    );
    
  
  useEffect(() => {
    const getFriends = async () => {
      try{
        const friendList = await axios.get("/users/friends/" + userFriend._id, {
          headers: {authorization: "Bearer " + currentUser.accessToken},
  
        });
        setFriends(friendList.data);
      }catch(err){
        console.log(err)
      }
    };
    getFriends();
  }, [userFriend])


  const followHandle = async () =>{
    try{
      if(followed){
        await axios.put("/users/"+userFriend._id+"/unfollow", {
          userId: currentUser._id
        }, {
          headers: {authorization: "Bearer " + currentUser.accessToken},
  
        });
        dispatch({
          type: "UNFOLLOW",
          payload: userFriend._id

        });
      }else{
        await axios.put("/users/"+userFriend._id+"/follow",  {
          userId: currentUser._id
        }, {
          headers: {authorization: "Bearer " + currentUser.accessToken},
  
        });
        dispatch({
          type: "FOLLOW",
          payload: userFriend._id
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
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) =>(
            <Online key={u.id} user={u}/>
          ))}
        </ul>
    </>
    )
  }

  const ProfileRightbar = () =>{
    return(
    <>
    {userFriend.username !== currentUser.username && (
      <button className='rightbarFollowButton' onClick={followHandle}>
        {followed ? "Unfollow" : "Follow" }
        {followed ? <Remove/> :  <Add/> }
        </button>
    )}
    <h4 className='rightbarTitle'>User information</h4>
    <div className="rightbarInfo">
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">City:</span>
        <span className="rightbarInfoValue">{userFriend.city}</span>
      </div>
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">Country:</span>
        <span className="rightbarInfoValue">{userFriend.from}</span>
      </div>
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">Relationship:</span>
        <span className="rightbarInfoValue">
      {userFriend.relationship === 1 
        ?  "Single" 
        : userFriend.relationship === 2 
        ? "Married" 
        : "-" }
        </span>
      </div>
    </div>
    <h4 className='rightbarTitle'>User friends</h4>
      <div className="rightbarFollowings">
        {friends.map((friend) => (
            <Link to={"/profile/" + friend.username} style={{textDecoration: "none"}}>
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
     {userFriend ? <ProfileRightbar/> : <HomeRightbar/>}
      </div>
    </div>
  )
}

export default Rightbar