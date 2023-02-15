import React from 'react'
import "./feed.css"
import Share from '../share/Share'
import Post from '../Post/Post'
import {Posts} from '../../dummydata'

const Feed = () => {
  return (
    <div className='feed'>
        <div className="feedWrapper">
    <Share/>
    {Posts.map((p) => (
      <Post key={p.id} Post={p}/>
      ))}
        </div>
    </div>
  )
}

export default Feed