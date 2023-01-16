import React from 'react'

const MyPostComment = (props) => {

    const {mypost} = props;

    const myPostComment = mypost.comment
    console.log(myPostComment)

  return (
    <div>
        {myPostComment.map((comment) => {
            return (
                <p>{comment.userId}{comment.comment}</p>
            )
        })}
    </div>
  )
}

export default MyPostComment
