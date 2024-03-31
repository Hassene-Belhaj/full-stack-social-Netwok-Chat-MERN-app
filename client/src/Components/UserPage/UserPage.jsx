import React from 'react'
import UserHeader from './UserHeader'
import UserPosts from './UserPosts'
import verified from '/verified.png'

const UserPage = () => {
  return (
    <>
    <UserHeader />
    <UserPosts avatar='zuck-avatar.png' verified={verified} postTitle={'lets Talk about Threads'} postImage={'post1.png'} likes={'7000'} replies={1200}/>
    <UserPosts avatar='zuck-avatar.png' verified={verified} postTitle={'nice tutorial'} postImage={'post2.png'} likes={'468'} replies={103} />
    <UserPosts avatar='zuck-avatar.png' verified={verified} postTitle={'i love this guy'} postImage={'post3.png'} likes={'280'} replies={98}/>
    <UserPosts avatar='zuck-avatar.png' verified={verified} postTitle={'lets code clone tutorial'} postImage={'post2.png'} likes={'5420'} replies={869}/>
    </>
  )
}

export default UserPage