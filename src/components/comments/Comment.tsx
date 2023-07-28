import React, { ComponentState } from 'react'
import CommentForm from './CommentForm'

export type CommentType = {
  id: number
  body: string
  username: string
  userId: number
  parentId: number | null
  createdAt: string
  type?: 'editing' | 'replying'
}

export type CommentAction = {
  comment: CommentType
  replies: CommentType[]
  setActiveComment: ComponentState
  activeComment: CommentType | ComponentState
  updateComment: (x: string, y: number) => void
  deleteComment: (x: number) => void
  addComment: (x: string, y: number) => void
  parentId: number | null
  currentUserId?: number
}

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId,
  currentUserId,
}: CommentAction) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === 'editing'
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === 'replying'
  const newDate = new Date()
  const timePassed: number = 300000
  const time = new Date(comment.createdAt)
  const tim1 = newDate.getTime() - time.getTime() > timePassed
  const canDelete =
    currentUserId === comment.userId && replies.length === 0 && !timePassed
  const canReply = Boolean(currentUserId)
  const canEdit = currentUserId === comment.userId && !tim1
  const replyId = parentId ? parentId : comment.id
  const createdAt = new Date(comment.createdAt).toLocaleDateString()
  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <img src="https://emojis.slackmojis.com/emojis/images/1665051119/61583/vibe-rabbit.gif?1665051119" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null)
            }}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: 'replying' })
              }>
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: 'editing' })
              }>
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}>
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Comment
