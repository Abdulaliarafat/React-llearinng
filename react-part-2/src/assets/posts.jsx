import { use } from "react"
import Post from "./post"

export default function Posts({postPromise}){
    const posts=use(postPromise)
    console.log(posts)
  return (
    <div className="cards">
        <h2>See all posts here : {posts.length}</h2>
        {
          posts.map(post=><Post post={post}></Post>)
        }
        
    </div>
  )
}