import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { convertFromRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const token = useSelector(state => state.auth.token);
  const userEmail = useSelector(state => state.auth.userEmail)
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch(`https://mail-box-client-2c91a-default-rtdb.firebaseio.com/emails.json?auth=${token}`);
        const data = await response.json();
        
        console.log('Fetched data:', data);
        console.log('User email:', userEmail);

        const loadedEmails = [];
        for (const key in data) {
          const email = data[key];
          const recipient = email.recipient
          console.log(`Checking email: ${key}, recipient: ${recipient}`);
          if (recipient === userEmail) {
            console.log(`Matching email found: ${key}`);
            loadedEmails.push({
              id: key,
              content: JSON.parse(email.content),
              recipient: email.recipient,
              sender: email.sender,
              subject: email.subject,
              timestamp: email.timestamp
            });
          }
        }
        console.log('Loaded emails:', loadedEmails);
        setEmails(loadedEmails);
      } catch (error) {
        console.error('Error fetching emails:', error.message);
        setEmails([]);
      }
    };

    fetchEmails();
  }, [token, userEmail]);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Inbox</h2>
        <Link to="/compose" className="btn btn-primary">Compose Email</Link>
      </div>
      <ul className="list-group">
        {emails.map(email => {
          const contentState = convertFromRaw(email.content);
          const editorState = EditorState.createWithContent(contentState);

          return (
            <li key={email.id} className="list-group-item">
              <p><strong>From:</strong> {email.sender}</p>
              <p><strong>Subject:</strong> {email.subject}</p>
              <div><strong>Message:</strong>
                <Editor
                  editorState={editorState}
                  toolbarHidden
                  readOnly
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                />
              </div>
              <p><strong>Time:</strong> {new Date(email.timestamp).toLocaleString()}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Inbox;