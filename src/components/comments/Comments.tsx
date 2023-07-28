import { useState, useEffect } from 'react'
import CommentForm from './CommentForm'
import Comment, { CommentAction } from './Comment'
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from '../../api/comments'
import type { CommentType } from './Comment'

const Comments = ({
  url,
  currentUserId,
}: {
  url: string
  currentUserId?: number
}) => {
  const [comments, setComments] = useState<CommentType[]>([])
  const [activeComment, setActiveComment] = useState(null)
  const rootComments = comments.filter(
    (comment) => comment.parentId === null
  )
  const getReplies = (commentId: number) =>
    comments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
  const addComment = (text: string, parentId: number) => {
    createComment(text, parentId).then((comment) => {
      setComments([comment, ...comments])
      setActiveComment(null)
    })
  }

  const upComment = (text: string, commentId: number) => {
    updateComment(text).then(() => {
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, body: text }
        }
        return comment
      })
      setComments(updatedComments)
      setActiveComment(null)
    })
  }
  const delComment = (commentId: number) => {
    if (window.confirm('Are you sure you want to remove comment?')) {
      deleteComment().then(() => {
        const updatedComments = comments.filter(
          (comment) => comment?.id !== commentId
        )
        setComments(updatedComments)
      })
    }
  }

  useEffect(() => {
    getComments().then((data) => {
      setComments(data)
    })
  }, [])

  return (
    <div className="comments">
      <h3 className="comments-title">comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={delComment}
            updateComment={upComment}
            currentUserId={currentUserId}
            parentId={null}
          />
        ))}
      </div>
    </div>
  )
}

export default Comments
