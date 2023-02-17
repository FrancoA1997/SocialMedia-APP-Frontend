import "./feed.css"
import React from 'react'
import Share from '../share/Share'
import Post from '../Post/Post'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Feed = () => {
 const [posts, setPosts] = useState([]);

  useEffect( () =>{
    const fetchPost = async () =>{
      const res = await axios.get("posts/timeline/63e6bb99eb596d5c4a550481")
      setPosts(res.data)
    };
    fetchPost();
  }, []);

  return (
    <div className='feed'>
        <div className="feedWrapper">
    <Share/>
    {posts.map((p) => (
      <Post key={p._id} Post={p}/>
   ))}
        </div>
    </div>
  )
}

export default Feed