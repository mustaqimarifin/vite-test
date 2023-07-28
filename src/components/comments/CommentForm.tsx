import { useState } from 'react'
type CForm = {
  handleSubmit: (z?: any,x?: any,c?: any) => void
  submitLabel: string
  hasCancelButton?: boolean
  handleCancel?: () => void
  initialText?: string
}

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = '',
}: CForm) => {
  const [text, setText] = useState(initialText)
  const isTextareaDisabled = text.length === 0
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    handleSubmit(text)
    setText('')
  }
  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="comment-form-button" disabled={isTextareaDisabled}>
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  )
}

export default CommentForm
