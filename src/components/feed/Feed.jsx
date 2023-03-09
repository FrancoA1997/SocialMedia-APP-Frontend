import "./feed.css"
import React, { useContext } from 'react'
import Share from '../share/Share'
import Post from '../Post/Post'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from "../../context/AuthContext"

const Feed = ({username}) => {
 const [posts, setPosts] = useState([]);
 const {user} = useContext(AuthContext)

  useEffect( () =>{
    const fetchPost = async () =>{
      const res = username 
      ? await axios.get("/posts/profile/" + username, {
        headers: {authorization: "Bearer " + user.accessToken},

      })
      : await axios.get("/posts/timeline/" + user._id, {
        headers: {authorization: "Bearer " + user.accessToken},

      });
      console.log(res.data)
      setPosts(res.data.sort((p1, p2) => {
      return  new Date(p2.createdAt) - new Date(p1.createdAt)
      })
      );
    };
    fetchPost();
  }, [username, user._id]);

  return (
    <div className='feed'>
        <div className="feedWrapper">
    {(!username || username === user.username) && <Share/>}
    {posts.map((p) => (
      <Post key={p._id} Post={p}/>
   ))}
        </div>
    </div>
  )
}

export default Feed