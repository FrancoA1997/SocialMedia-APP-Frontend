import React from 'react'
import "./post.css"
import { MoreVert } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'

const Post = ({Post}) => {
 const PF = process.env.REACT_APP_PUBLIC_FOLDER;

 const [like, setLike] = useState(Post.like);
 const [isLiked, setIsLiked] = useState(false);
 const [user, setUser] = useState({});

 useEffect( () =>{
    const fetchUser = async() =>{
      const res = await axios.get(`/users?userId=${Post.userId}`)
      setUser(res.data);
    }
    fetchUser();
  }, [Post.userId]);

 const likeHandler = () =>{
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
 }
   
  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.username}`}>
                    <img src={user.profilePicture || PF+"person/noAvatar.png" } className='postProfileImg' alt="" />
                    </Link>
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