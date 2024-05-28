import React, { useState } from 'react';
import './Editorbar.css';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { previewPosts } from './firestore/firestoreAccess';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const Editorbar = ({ user, setPosts,showConfirm,setShowConfirm }) => {
  const [text, setText] = useState('');
  const [showError,setShowError] = useState(false);

  // 折り返し地点で改行を挿入する関数
  const insertLineBreaks = (text, lineLength) => {
    const lines = [];
    let position = 0;
    while (position < text.length) {
      let line = text.slice(position, position + lineLength);
      lines.push(line);
      position += lineLength;
    }
    return lines.join('\n');
  };


  const submitButton = async () => {
    if (text.trim() !== '') {
      try {
        let username = "unknown";
        let usericon = "unknown";
        let userid = new Date().toISOString(); // Firebaseのタイムスタンプ形式に変更

        if(user !== null){
          usericon = user.photoURL;
          username = user.displayName;
          userid = user.uid;
        }

        // テキストに折り返し地点で改行を挿入
        const formattedText = insertLineBreaks(text, 35);

        await addDoc(collection(db, 'posts'), {
          text: formattedText,
          uid: new Date().toISOString(), // Firebaseのタイムスタンプ形式に変更
          usericon: usericon,
          userName: username,
          userid: userid,
          like: 0,
          createdAt: new Date(),
        });
        setText('');
        setShowConfirm(false);
        // 投稿を追加した後に最新の投稿を取得してセットする
        const posts = await previewPosts();
        setPosts(posts);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    } else {
      alert('テキストを入力してください。');
    }
  };

  const confirmSubmit = () => {
    if(text.trim() !== ''){
      setShowConfirm(true);
    }else{
      setShowError(true);
      setShowConfirm(true);
    }
  };

  const handleConfirm = (confirm) => {
    if(confirm){
      submitButton();
    }else{
      setShowConfirm(false);
    }
  }

  const handleError = () => {
    setShowConfirm(false);
    setShowError(false);
  }

  return (
    <div className='app-editorbar'>
      <div className="edit-text">
        <textarea placeholder="What's happening?!" value={text} onChange={(e) => setText(e.target.value)}></textarea>
      </div>
      <FontAwesomeIcon className='edit-button' onClick={confirmSubmit} icon={faPenToSquare} />

      {(showConfirm && !showError) && (
        <div className='confirm-dialog'>
          <p>この内容で投稿しますか？</p>
          <div className='confirm-dialog-button'>
            <button onClick={() => handleConfirm(true)}>はい</button>
            <button onClick={() => handleConfirm(false)}>いいえ</button>
          </div>
        </div>
      )}
      {(showError && showError) && (
        <div className='confirm-dialog'>
          <p>テキストを入力してください。</p>
          <div className='confirm-dialog-button'>
            <button onClick={handleError}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editorbar;
