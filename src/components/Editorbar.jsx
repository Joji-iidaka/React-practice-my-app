import React from 'react'
import './Editorbar.css'

const Editorbar = () => {
  return (
    <div className='app-editorbar'>
      <div className="edit-text">
        <textarea></textarea>
      </div>
      <div className="edit-submit">
        <button>投稿する</button>
      </div>
    </div>
  )
}

export default Editorbar
