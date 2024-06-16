import React, { useState, useRef } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ComposeMail.css'

const ComposeMail = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isLoading, setIsLoading] = useState(false);
  const recipientInputRef = useRef();
  const subjectInputRef = useRef();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  const userEmail = useSelector(state => state.auth.userEmail);

  const sendEmailHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const enteredRecipient = recipientInputRef.current.value;
    const enteredSubject = subjectInputRef.current.value;
    const emailContent = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

    try {
      const response = await fetch(`https://mail-box-client-2c91a-default-rtdb.firebaseio.com/emails.json?auth=${token}`, {
        method: 'POST',
        body: JSON.stringify({
          sender: userEmail,
          recipient: enteredRecipient,
          subject: enteredSubject,
          content: emailContent,
          timestamp: new Date().toISOString()
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setIsLoading(false);
      navigate('/welcome');
    } catch (error) {
      console.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={sendEmailHandler}>
        <div className="mb-3">
          <label htmlFor="recipient" className="form-label">To</label>
          <input type="email" className="form-control" id="recipient" ref={recipientInputRef} required />
        </div>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">Subject</label>
          <input type="text" className="form-control" id="subject" ref={subjectInputRef} required />
        </div>
        <div className="mb-3">
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={setEditorState}
          />
        </div>
        <div className="d-flex justify-content-end mt-3">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Email'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComposeMail;
