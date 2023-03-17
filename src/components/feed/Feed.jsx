import "./feed.css"
import React, { useContext, useRef,useState, useEffect } from 'react'
import Share from '../share/Share'
import Post from '../Post/Post'
import { AuthContext } from "../../context/AuthContext"
import useAxios from '../api/useAxios'



const Feed = ({username}) => {
  const {user} = useContext(AuthContext)
  const [posts, setPosts] = useState([]);
  const api = useAxios()

  useEffect( () =>{
    const fetchPost = async () =>{
      const res = username 
      ? await api.get("/posts/profile/" + username)

      : await api.get("/posts/timeline/" + user._id);
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