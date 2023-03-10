import React, { useContext } from 'react'
import "./post.css"
import { MoreVert } from '@mui/icons-material'
import { useState, useEffect } from 'react'

import useAxios from '../api/useAxios'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Post = ({Post}) => {
 const PF = process.env.REACT_APP_PUBLIC_FOLDER;
 const [like, setLike] = useState(Post.likes.length);
 const [isLiked, setIsLiked] = useState(false);
 const [user, setUser] = useState({});
 const { user: currentUser } = useContext(AuthContext);
 const api = useAxios()

 useEffect(() =>{
    setIsLiked(Post.likes.includes(currentUser._id))
 },[currentUser._id, Post.likes] 
 );
 useEffect( () =>{
    const fetchUser = async() =>{
      const res = await api.get(`/users?userId=${Post.userId}`);
      setUser(res.data);
    }
    fetchUser();
  }, [Post.userId]);

 const likeHandler = async () =>{
    try{
     await api.put("/posts/" + Post._id + "/like", {userId: currentUser._id})
    }catch(err){

    }
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
 }
   
  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
            <Link to={`profile/${user.username}`}>
                    <img src={ user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png" } className='postProfileImg' alt="" />
                    </Link>
                <div className="postTopLeft">
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(Post.createdAt)}</span>
                    
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{Post.description}</span>
                <img className='postImg'  src={PF+Post.img} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className='likeIcon' src={`${PF}heart.png`} onClick={likeHandler} alt="" />
                    <img className='likeIcon' src={`${PF}like.png`} onClick={likeHandler} alt="" />
                    <span className="postLikeCounter">{like} people liked it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{Post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post