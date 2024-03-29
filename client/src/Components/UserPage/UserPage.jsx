import React from 'react'
import UserHeader from './UserHeader'
import UserPost from './UserPost'

const UserPage = () => {
  return (
    <>
    <UserHeader />
    <UserPost avatar='zuck-avatar.png' postTitle={'lets Talk about Threads'} postImage={'post1.png'} likes={'7000'} replies={1200}/>
    <UserPost avatar='zuck-avatar.png' postTitle={'nice tutorial'} postImage={'post2.png'} likes={'468'} replies={103} />
    <UserPost avatar='zuck-avatar.png' postTitle={'i love this guy'} postImage={'post3.png'} likes={'280'} replies={98}/>
    <UserPost avatar='zuck-avatar.png' postTitle={'lets code clone tutorial'} postImage={'post2.png'} likes={'5420'} replies={869}/>
    </>
  )
}

export default UserPage