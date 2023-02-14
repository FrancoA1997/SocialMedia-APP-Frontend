import React from 'react'
import "./feed.css"
import Share from '../share/Share'
import Post from '../Post/Post'
const Feed = () => {
  return (
    <div className='feed'>
        <div className="feedWrapper">
    <Share/>
    <Post/>

        </div>
    </div>
  )
}

export default Feed